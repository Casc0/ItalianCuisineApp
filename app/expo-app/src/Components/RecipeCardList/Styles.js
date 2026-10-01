import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    margin: 4,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e5e5',
  },
  // Nuevo: contenedor exclusivo de la imagen, con posición 'relative' explícita
  // para que las franjas absolutas de adentro se midan desde SU borde, no el de la card entera
  imageWrapper: {
    width: '100%',
    aspectRatio: 2,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  fakeGradientLayer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 10,
  },
  infoBox: {
    padding: 6,
  },
  title: {
    color: '#111111',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 4,
    fontFamily: 'Sedan'
  },
  rating: {
    color: '#333333',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default styles;