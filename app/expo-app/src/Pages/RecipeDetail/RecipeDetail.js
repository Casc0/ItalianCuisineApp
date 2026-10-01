import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {AnimatedRecipeCard} from "../../Components/RecipeCard/RecipeCard";
import {
  View,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  getRecipeById,
  getSimilarRecipes,
} from "../../Services/recipes.service";
import { getImageUrl } from "../../Constants/constants";
import styles from "./Styles";
import StarRating from '../../Components/StarRating/StarRating';
import { useAuth } from '../../Context/AuthContext';

export default function RecipeDetail({ route, navigation }) {
  const { id } = route.params;

  const [recipe, setRecipe] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [recipeData, similarData] = await Promise.all([
          getRecipeById(id),
          getSimilarRecipes(id),
        ]);
        setRecipe(recipeData);
        setSimilar(similarData);
      } catch (error) {
        console.error("Error al cargar el detalle:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  useEffect(() => {
    if (recipe) {
      navigation.setOptions({ title: recipe.nombre });
    }
  }, [recipe]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#CD212A" />
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={styles.loaderContainer}>
        <Text>No se pudo cargar la receta.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: getImageUrl(recipe.imagenPrincipal) }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{recipe.nombre}</Text>
        <Text style={styles.description}>{recipe.descripcion}</Text>

        {/* Categorías: tiempo, dificultad, porciones, región */}
        <View style={styles.badgesRow}>
          {recipe.categorias?.tiempoNota && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                ⏱ {recipe.categorias.tiempoNota}
              </Text>
            </View>
          )}
          {recipe.categorias?.dificultad && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {recipe.categorias.dificultad}
              </Text>
            </View>
          )}
          {recipe.categorias?.porcionesNota && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                🍽 {recipe.categorias.porcionesNota}
              </Text>
            </View>
          )}
          {recipe.categorias?.region && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                📍 {recipe.categorias.region}
              </Text>
            </View>
          )}
        </View>

        {/* Valoración: estrellitas visuales del promedio + acción de votar */}
        <View style={styles.ratingRow}>
          <View style={styles.ratingPill}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Ionicons
                key={star}
                name="star"
                size={20}
                color={
                  star <= Math.round(recipe.valoracion?.promedio ?? 0)
                    ? "#FFD60A"
                    : "#2b2b2b"
                }
                style={styles.ratingStar}
              />
            ))}
          </View>
          <Text style={styles.ratingCount}>
            {recipe.valoracion?.promedio ?? 0} ({recipe.valoracion?.total ?? 0}{" "}
            valoracion/es)
          </Text>
        </View>

        {/* Ingredientes */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Ingredientes</Text>
          {recipe.ingredientes?.map((ing, i) => (
            <View
              key={i}
              style={[
                styles.ingredientRow,
                i === recipe.ingredientes.length - 1 &&
                  styles.ingredientRowLast,
              ]}
            >
              <Text style={styles.ingredientBullet}>▸</Text>
              <Text style={styles.ingredientText}>
                {ing.cantidad ? `${ing.cantidad} ${ing.unidad ?? ""} de ` : ""}
                {ing.nombre}
                {ing.nota ? ` (${ing.nota})` : ""}
              </Text>
            </View>
          ))}
        </View>

        {/* Pasos */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Preparación</Text>
          {recipe.pasos
            ?.sort((a, b) => a.orden - b.orden)
            .map((paso) => (
              <View key={paso.orden} style={styles.stepRow}>
                <Text style={styles.stepNumber}>{paso.orden}</Text>
                <Text style={styles.stepText}>{paso.descripcion}</Text>
              </View>
            ))}
        </View>

        {/* Consejo del chef */}
        {recipe.consejo && (
          <View style={styles.tipBox}>
            <Text style={styles.tipTitle}>💡 Consejo</Text>
            <Text style={styles.tipText}>{recipe.consejo}</Text>
          </View>
        )}

<View style={styles.ratingBox}>
  {user ? (
    <StarRating
      slug={recipe.slug}
      currentAverage={recipe.valoracion?.promedio}
      currentTotal={recipe.valoracion?.total}
      onRated={(updated) => setRecipe((prev) => ({ ...prev, valoracion: updated }))}
    />
  ) : (
    <TouchableOpacity
      onPress={() => navigation.navigate('Login')}
      style={styles.loginPromptInner}
    >
      <Text style={styles.loginPromptText}>Iniciá sesión para valorar esta receta →</Text>
    </TouchableOpacity>
  )}
</View>

      </View>

      {/* Recetas similares */}
      {similar.length > 0 && (
        <View style={styles.similarSection}>
          <View style={styles.similarTitleWrapper}>
            <Text style={styles.similarTitleText}>Recetas para explorar</Text>
          </View>
          <FlatList
            data={similar}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.slug}
            contentContainerStyle={styles.similarList}
            renderItem={({ item, index }) => (
              <AnimatedRecipeCard
                item={item}
                isActive={index === activeIndex}
                pushed={activeIndex !== null && index > activeIndex}
                onPress={() => {
                  if (index === activeIndex) {
                    navigation.push("RecipeDetail", { id: item.slug });
                  } else {
                    setActiveIndex(index);
                  }
                }}
              />
            )}
          />
        </View>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("RecipeList")}
      >
        <Text style={styles.buttonText}>Ver todas las recetas</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}