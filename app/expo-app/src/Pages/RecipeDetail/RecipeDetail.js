import { View, Text } from 'react-native';
import styles from './Styles';

export default function RecipeDetail({ route }) {
  const { id } = route.params;

  return (
    <View style={styles.container}>
      <Text>Recipe Detail Screen</Text>
      <Text>Recipe ID: {id}</Text>
    </View>
  );
}
