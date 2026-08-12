// RecipeCard.js — Recipe preview card with image, name, description, rating, and tap action
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { getImageUrl } from '../../Constants/constants';
import styles from './Styles';

export default function RecipeCard({ recipe, onPress }) {
  // Mostramos hasta 3 identificadores como tags (evita que la card crezca demasiado)
  const tags = (recipe.identificadores || []).slice(0, 3);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image
        source={{ uri: getImageUrl(recipe.imagenPrincipal) }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title} numberOfLines={1}>{recipe.nombre}</Text>

      {tags.length > 0 && (
        <View style={styles.tagsRow}>
          {tags.map((tag) => (
            <View key={tag} style={styles.tag}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.rating}>⭐ {recipe.valoracion?.promedio ?? 0}</Text>
        <Text style={styles.region}>{recipe.categorias?.region}</Text>
      </View>
    </TouchableOpacity>
  );
}