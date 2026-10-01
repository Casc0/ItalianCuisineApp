import { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Pressable,
} from "react-native";
import { getImageUrl } from "../../Constants/constants";
import styles from "./Styles";

export default function FeaturedRecipeCard({ recipe, onViewFull }) {
  const [flipped, setFlipped] = useState(false);
  const flipAnim = useRef(new Animated.Value(0)).current;

  const toggleFlip = () => {
    Animated.spring(flipAnim, {
      toValue: flipped ? 0 : 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    setFlipped(!flipped);
  };

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  return (
    <View style={styles.card}>
      {/* CARA DE ADELANTE */}
      <Animated.View
        style={[
          styles.face,
          {
            transform: [{ rotateY: frontInterpolate }],
            pointerEvents: flipped ? "none" : "auto",
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={toggleFlip}
          disabled={flipped}
          style={{ flex: 1 }}
        >
          <Image
            source={{ uri: getImageUrl(recipe.imagenPrincipal) }}
            style={styles.image}
          />
          <View style={styles.overlay}>
            <Text style={styles.tag}>Destacado</Text>
            <View style={styles.titleBox}>
              <Text style={styles.title}>{recipe.nombre}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>

      {/* CARA DE ATRÁS */}
      <Animated.View
        style={[
          styles.face,
          styles.back,
          {
            transform: [{ rotateY: backInterpolate }],
            pointerEvents: flipped ? "auto" : "none",
          },
        ]}
      >
        <Image
          source={{ uri: getImageUrl(recipe.imagenPrincipal) }}
          style={styles.backImage}
          blurRadius={8}
        />
        <View style={styles.backDarkOverlay} pointerEvents="none" />

        <View style={styles.backTouchArea}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={toggleFlip}
            disabled={!flipped}
          >
            <Text style={styles.backTitle}>Ingredientes</Text>
            {recipe.ingredientes?.slice(0, 6).map((ing, i) => (
              <Text key={i} style={styles.backItem}>
                ✓ {ing.nombre}
              </Text>
            ))}
          </TouchableOpacity>
        </View>

        <Pressable
          onPress={() => onViewFull && onViewFull()}
          disabled={!flipped}
          style={styles.backButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Text style={styles.backButtonText}>Ver receta completa →</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}
