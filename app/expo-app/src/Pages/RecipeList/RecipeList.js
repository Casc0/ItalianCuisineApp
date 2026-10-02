import { useState, useEffect } from "react";
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { getRecipes, getAllRecipes } from "../../Services/recipes.service";
import { PAGE_SIZE } from "../../Constants/constants";
import RecipeCard from "../../Components/RecipeCard/RecipeCard";
import RecipeCardCompact from "../../Components/RecipeCardList/RecipeCardList";
import styles from "./Styles";

// En la web mantenemos la grilla de 4 columnas (más lugar en pantalla).
// En celular usamos la card horizontal completa, porque en 4 columnas
// el nombre de la receta no se llegaba a leer bien.
const isWeb = Platform.OS === "web";
const MIN_INITIAL_ITEMS = 20;

// Opciones fijas: no dependen de los datos, ya las conocemos de antemano
// porque así están definidas en el modelo del backend.
const DIFICULTADES = ["Fácil", "Medio", "Difícil"];
const RATING_OPTIONS = [3, 4, 5];

export default function RecipeList({ navigation }) {
  // --- Paginado normal (scroll infinito) --
  const [recipes, setRecipes] = useState([]);
  const [from, setFrom] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  // --- Búsqueda y filtros: trabajan sobre el set completo de recetas ---
  const [query, setQuery] = useState("");
  const [allRecipes, setAllRecipes] = useState([]);
  const [loadingAll, setLoadingAll] = useState(false);

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDificultad, setSelectedDificultad] = useState(null);
  const [selectedTag, setSelectedTag] = useState(null);
  const [minRating, setMinRating] = useState(null);

  // --- Booleanos derivados ---
  const isSearching = query.trim().length > 0;
  const isFiltering = !!(
    selectedRegion ||
    selectedDificultad ||
    selectedTag ||
    minRating
  );
  const hasActiveFilter = isSearching || isFiltering;
  const needsFullData = hasActiveFilter || filtersOpen;

  const activeFilterCount = [
    selectedRegion,
    selectedDificultad,
    selectedTag,
    minRating,
  ].filter(Boolean).length;

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const result = await getRecipes(from, PAGE_SIZE);
      setRecipes((prev) => [...prev, ...result.data]);
      setFrom((prev) => prev + PAGE_SIZE);
      setHasMore(result.hasMore);
    } catch (error) {
      console.error("Error al cargar recetas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  // Solo hace falta la auto-carga extra en web (grilla, donde pocas recetas no llenan la pantalla)
  useEffect(() => {
    if (
      isWeb &&
      !hasActiveFilter &&
      !loading &&
      hasMore &&
      recipes.length > 0 &&
      recipes.length < MIN_INITIAL_ITEMS
    ) {
      loadMore();
    }
  }, [recipes.length, loading]);

  // Trae las 70 recetas una sola vez, la primera vez que hace falta.
  useEffect(() => {
    if (needsFullData && allRecipes.length === 0 && !loadingAll) {
      const loadAll = async () => {
        setLoadingAll(true);
        try {
          const data = await getAllRecipes();
          setAllRecipes(data);
        } catch (error) {
          console.error("Error al cargar todas las recetas:", error);
        } finally {
          setLoadingAll(false);
        }
      };
      loadAll();
    }
  }, [needsFullData]);

  const normalize = (text) =>
    text.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  // Las listas de opciones para región y etiquetas se arman solas a partir de
  // las recetas ya cargadas. Set() descarta los valores repetidos; sort() las
  // deja en orden alfabético.
  const regionOptions = [
    ...new Set(allRecipes.map((r) => r.categorias?.region).filter(Boolean)),
  ].sort();
  const tagOptions = [
    ...new Set(allRecipes.flatMap((r) => r.identificadores || [])),
  ].sort();

  const matchesFilters = (recipe) => {
    if (isSearching && !normalize(recipe.nombre).includes(normalize(query)))
      return false;
    if (selectedRegion && recipe.categorias?.region !== selectedRegion)
      return false;
    if (
      selectedDificultad &&
      recipe.categorias?.dificultad !== selectedDificultad
    )
      return false;
    if (selectedTag && !(recipe.identificadores || []).includes(selectedTag))
      return false;
    if (minRating && (recipe.valoracion?.promedio ?? 0) < minRating)
      return false;
    return true;
  };

  const filteredRecipes = hasActiveFilter
    ? allRecipes.filter(matchesFilters)
    : recipes;

  const clearFilters = () => {
    setQuery("");
    setSelectedRegion(null);
    setSelectedDificultad(null);
    setSelectedTag(null);
    setMinRating(null);
  };

  // Un solo helper para "elegir de nuevo lo mismo = deseleccionar"
  const togglePill = (value, selected, setSelected) => {
    setSelected(selected === value ? null : value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar receta por nombre..."
          value={query}
          onChangeText={setQuery}
          clearButtonMode="while-editing"
        />
        <TouchableOpacity
          style={[
            styles.filtersToggle,
            isFiltering && styles.filtersToggleActive,
          ]}
          onPress={() => setFiltersOpen((prev) => !prev)}
        >
          <Text
            style={[
              styles.filtersToggleText,
              isFiltering && styles.filtersToggleTextActive,
            ]}
          >
            Filtros{activeFilterCount > 0 ? ` (${activeFilterCount})` : ""}{" "}
            {filtersOpen ? "▲" : "▼"}
          </Text>
        </TouchableOpacity>
      </View>

      {filtersOpen && (
        <View style={styles.filtersPanel}>
          {loadingAll && allRecipes.length === 0 ? (
            <Text style={styles.filtersLoadingText}>
              Cargando opciones de filtro...
            </Text>
          ) : (
            <>
              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Dificultad</Text>
                <View style={styles.pillRowStatic}>
                  {DIFICULTADES.map((d) => (
                    <TouchableOpacity
                      key={d}
                      style={[
                        styles.pill,
                        selectedDificultad === d && styles.pillActive,
                      ]}
                      onPress={() =>
                        togglePill(d, selectedDificultad, setSelectedDificultad)
                      }
                    >
                      <Text
                        style={[
                          styles.pillText,
                          selectedDificultad === d && styles.pillTextActive,
                        ]}
                      >
                        {d}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.filterGroup}>
                <Text style={styles.filterLabel}>Valoración mínima</Text>
                <View style={styles.pillRowStatic}>
                  {RATING_OPTIONS.map((n) => (
                    <TouchableOpacity
                      key={n}
                      style={[
                        styles.pill,
                        minRating === n && styles.pillActive,
                      ]}
                      onPress={() => togglePill(n, minRating, setMinRating)}
                    >
                      <Text
                        style={[
                          styles.pillText,
                          minRating === n && styles.pillTextActive,
                        ]}
                      >
                        {n}+ ⭐
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {regionOptions.length > 0 && (
                <View style={styles.filterGroup}>
                  <Text style={styles.filterLabel}>Región</Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.pillRow}
                  >
                    {regionOptions.map((r) => (
                      <TouchableOpacity
                        key={r}
                        style={[
                          styles.pill,
                          selectedRegion === r && styles.pillActive,
                        ]}
                        onPress={() =>
                          togglePill(r, selectedRegion, setSelectedRegion)
                        }
                      >
                        <Text
                          style={[
                            styles.pillText,
                            selectedRegion === r && styles.pillTextActive,
                          ]}
                        >
                          {r}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              {tagOptions.length > 0 && (
                <View style={styles.filterGroup}>
                  <Text style={styles.filterLabel}>Etiquetas</Text>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.pillRow}
                  >
                    {tagOptions.map((t) => (
                      <TouchableOpacity
                        key={t}
                        style={[
                          styles.pill,
                          selectedTag === t && styles.pillActive,
                        ]}
                        onPress={() =>
                          togglePill(t, selectedTag, setSelectedTag)
                        }
                      >
                        <Text
                          style={[
                            styles.pillText,
                            selectedTag === t && styles.pillTextActive,
                          ]}
                        >
                          {t}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              )}

              {(isFiltering || isSearching) && (
                <TouchableOpacity
                  style={styles.clearFiltersButton}
                  onPress={clearFilters}
                >
                  <Text style={styles.clearFiltersText}>
                    Limpiar filtros y búsqueda
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </View>
      )}

      {hasActiveFilter && !loadingAll && (
        <Text style={styles.resultsCount}>
          {filteredRecipes.length} receta
          {filteredRecipes.length !== 1 ? "s" : ""} encontrada
          {filteredRecipes.length !== 1 ? "s" : ""}
        </Text>
      )}

      {hasActiveFilter && loadingAll ? (
        <ActivityIndicator style={styles.loader} size="large" color="#CD212A" />
      ) : (
        <FlatList
          data={filteredRecipes}
          keyExtractor={(item) => item.slug}
          numColumns={isWeb ? 4 : 1}
          key={isWeb ? "grid" : "list"}
          renderItem={({ item }) =>
            isWeb ? (
              <RecipeCardCompact
                recipe={item}
                onPress={() =>
                  navigation.navigate("RecipeDetail", { id: item.slug })
                }
              />
            ) : (
              <RecipeCard
                recipe={item}
                onPress={() =>
                  navigation.navigate("RecipeDetail", { id: item.slug })
                }
              />
            )
          }
          onEndReached={!hasActiveFilter ? loadMore : undefined}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            !hasActiveFilter && loading ? (
              <ActivityIndicator style={styles.loader} size="small" />
            ) : null
          }
          ListEmptyComponent={
            <Text style={styles.empty}>
              {hasActiveFilter
                ? "No se encontraron recetas con esos criterios"
                : "No hay recetas todavía"}
            </Text>
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}
