import { View, Text, Image, TouchableOpacity } from 'react-native';
import { getImageUrl } from '../../Constants/constants';
import styles from './Styles';

export default function RecipeCardCompact({ recipe, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      {/* Contenedor propio para la imagen: las franjas se posicionan RELATIVAS a este, no a toda la card */}
      <View style={styles.imageWrapper}>
        <Image
          source={{ uri: getImageUrl(recipe.imagenPrincipal) }}
          style={styles.image}
        />
        <View style={[styles.fakeGradientLayer, { bottom: 24, backgroundColor: 'rgba(255,255,255,0.15)' }]} />
        <View style={[styles.fakeGradientLayer, { bottom: 16, backgroundColor: 'rgba(255,255,255,0.35)' }]} />
        <View style={[styles.fakeGradientLayer, { bottom: 8, backgroundColor: 'rgba(255,255,255,0.6)' }]} />
        <View style={[styles.fakeGradientLayer, { bottom: 0, backgroundColor: 'rgba(255,255,255,0.9)' }]} />
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.title} numberOfLines={2}>{recipe.nombre}</Text>
        <Text style={styles.rating}>⭐ {recipe.valoracion?.promedio ?? 0}</Text>
      </View>
    </TouchableOpacity>
  );
}