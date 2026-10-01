import { View, Text } from 'react-native';
import styles from './Styles';

// El mismo título tricolor que hay en el Home, pero en versión chica para caber en la barra superior.
export default function HeaderTitle() {
  return (
    <View style={styles.row}>
      <Text style={[styles.part, { color: '#fff' }]}>Cocina Italiana</Text>
    </View>
  );
}