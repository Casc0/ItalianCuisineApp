// página Home

import { useState, useEffect } from "react";
import {
  // hooks
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import { getFeaturedRecipes, getRecipes } from "../../Services/recipes.service";
import { PAGE_SIZE, getImageUrl } from "../../Constants/constants";
import { useFonts } from "expo-font";
import { AnimatedRecipeCard } from "../../Components/RecipeCard/RecipeCard";
import styles from "./Styles";
import { colors } from "../../Constants/theme";
import FeaturedRecipeCard from "../../Components/FeaturedRecipeCard/FeaturedRecipeCard";
import { useAuth } from "../../Context/AuthContext";

export default function Home({ navigation }) {
  const [featured, setFeatured] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  const { user, logout } = useAuth();

  const [fontsLoaded] = useFonts({
    // fuentes a utilizar con fontFamily en Styles
    Meie: require("../../../assets/fonts/MeieScript-Regular.ttf"),
    Italiana: require("../../../assets/fonts/Italiana-Regular.ttf"),
    Quicksand: require("../../../assets/fonts/Quicksand-VariableFont_wght.ttf"),
    Tangerine: require("../../../assets/fonts/Tangerine-Regular.ttf"),
    Carattere: require("../../../assets/fonts/Carattere-Regular.ttf"),
    Sedan: require("../../../assets/fonts/SedanSC-Regular.ttf"),
  });

  useEffect(() => {
    //TRAER DATOS API
    const loadData = async () => {
      try {
        const [featuredData, recipesData] = await Promise.all([
          // hacemos dos llamadas en paralelo
          getFeaturedRecipes(1),
          getRecipes(0, PAGE_SIZE), // Guardamos las recetas
        ]);
        setFeatured(featuredData[0] ?? null);
        setRecipes(recipesData.data);
      } catch (error) {
        console.error("Error al cargar el home:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    //aplicar fuente al Header
    if (fontsLoaded) {
      navigation.setOptions({
        headerTitleStyle: {
          fontFamily: "Meie",
          color: "#fff",
          fontSize: 24,
        },
      });
    }
  }, [fontsLoaded]);

  if (loading || !fontsLoaded) {
    // Pantalla de carga --> es un spinner rojo (ruedita)
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#CD212A" />
      </View>
    );
  }

  return (
    // lo que se ve en pantalla

    <ScrollView style={styles.container}>
      <View style={styles.titleRow}>
        <Text style={[styles.titlePart, { color: "#008C45" }]}>Cocin</Text>
        <Text style={[styles.titlePart, { color: "#000000" }]}>a Ita</Text>
        <Text style={[styles.titlePart, { color: "#CD212A" }]}>liana</Text>
      </View>
      {featured && ( // si hay receta destacada mostrar la flip card
        <FeaturedRecipeCard
          recipe={featured}
          onViewFull={() =>
            navigation.navigate("RecipeDetail", { id: featured.slug })
          }
        />
      )}
      
      <View style={styles.dividerRow}>
        <Image
          source={require("../../../assets/images/divisorSinFondo.png")}
          style={[styles.dividerImage, { pointerEvents: "none" }]}
          resizeMode="contain"
        />
        <View style={styles.sectionTitleWrapper}>
          <Text style={styles.sectionTitle}>Recetas para explorar</Text>
        </View>
      </View>
      <FlatList // carrusel de recetas con las recipe cards
        data={recipes}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.slug}
        contentContainerStyle={styles.horizontalList}
        renderItem={({ item, index }) => (
          <AnimatedRecipeCard
            item={item}
            isActive={index === activeIndex}
            pushed={activeIndex !== null && index > activeIndex}
            onPress={() => {
              if (index === activeIndex) {
                navigation.navigate("RecipeDetail", { id: item.slug });
              } else {
                setActiveIndex(index);
              }
            }}
          />
        )}
      />
      <TouchableOpacity // boton a lista completa de recetas
        style={styles.button}
        onPress={() => navigation.navigate("RecipeList")}
      >
        <Text style={styles.buttonText}>Ver todas las recetas</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
