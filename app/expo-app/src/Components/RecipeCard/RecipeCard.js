// RecipeCard.js — Recipe preview card with image, name, description, rating, and tap action
import { useRef, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, Animated } from "react-native";
import { getImageUrl } from "../../Constants/constants";
import styles from "./Styles";

export default function RecipeCard({ recipe, onPress, expanded = false }) {
  // Mostramos hasta 3 identificadores como tags (evita que la card crezca demasiado)
  const tags = (recipe.identificadores || []).slice(0, 3);

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <Image
        source={{ uri: getImageUrl(recipe.imagenPrincipal) }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title} numberOfLines={expanded ? undefined : 1}>
        {recipe.nombre}
      </Text>

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

// Card animada: envuelve a RecipeCard y le agrega el resorte de movimiento/escala
// cuando está "activa" (tocada) o "empujada" (una card activa la corrió al costado).
export function AnimatedRecipeCard({ item, isActive, pushed, onPress }) {
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateX, {
        toValue: pushed ? 90 : 0,
        useNativeDriver: true,
        friction: 6,
        tension: 60,
      }),
      Animated.spring(translateY, {
        toValue: isActive ? -20 : 0,
        useNativeDriver: true,
        friction: 6,
        tension: 60,
      }),
      Animated.spring(scale, {
        toValue: isActive ? 1.12 : 1,
        useNativeDriver: true,
        friction: 6,
        tension: 60,
      }),
    ]).start();
  }, [isActive, pushed]);

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress}>
      <Animated.View
        style={[
          { width: 220 },
          { transform: [{ translateX }, { translateY }, { scale }] },
        ]}
      >
        <View pointerEvents="none">
          <RecipeCard recipe={item} expanded={isActive} />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
}
