import { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import { getFeaturedRecipes, getRecipes } from '../../Services/recipes.service';
import { PAGE_SIZE, getImageUrl} from '../../Constants/constants';
import RecipeCard from '../../Components/RecipeCard/RecipeCard';
import styles from './Styles';

export default function Home({ navigation }) {
  const [featured, setFeatured] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Pedimos las dos cosas en paralelo, no una tras otra
        const [featuredData, recipesData] = await Promise.all([
          getFeaturedRecipes(1),
          getRecipes(0, PAGE_SIZE),
        ]);
        setFeatured(featuredData[0] ?? null);
        setRecipes(recipesData.data);
      } catch (error) {
        console.error('Error al cargar el home:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#CD212A" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Título tricolor, como en el index.html original */}
      <View style={styles.titleRow}>
        <Text style={[styles.titlePart, { color: '#008C45' }]}>Cocin</Text>
        <Text style={[styles.titlePart, { color: '#CD212A' }]}>a Ita</Text>
        <Text style={[styles.titlePart, { color: '#111' }]}>liana</Text>
      </View>

      {/* Receta destacada */}
      {featured && (
        <TouchableOpacity
          style={styles.featuredCard}
          onPress={() => navigation.navigate('RecipeDetail', { id: featured.slug })}
        >
          <Image source={{ uri: getImageUrl(featured.imagenPrincipal) }} style={styles.featuredImage} />
          <View style={styles.featuredOverlay}>
            <Text style={styles.featuredTag}>Destacado</Text>
            <Text style={styles.featuredTitle}>{featured.nombre}</Text>
          </View>
        </TouchableOpacity>
      )}

      {/* Fila horizontal de recetas */}
      <Text style={styles.sectionTitle}>Recetas para explorar</Text>
      <FlatList
        data={recipes}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.slug}
        contentContainerStyle={styles.horizontalList}
        renderItem={({ item }) => (
          <View style={styles.horizontalCardWrapper}>
            <RecipeCard recipe={item} onPress={() => navigation.navigate('RecipeDetail', { id: item.slug })} />
          </View>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RecipeList')}>
        <Text style={styles.buttonText}>Ver todas las recetas</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}