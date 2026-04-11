import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Pages/Home/Home';
import RecipeList from '../Pages/RecipeList/RecipeList';
import RecipeDetail from '../Pages/RecipeDetail/RecipeDetail';
import AddRecipe from '../Pages/AddRecipe/AddRecipe';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ title: 'Cocina Italiana' }} />
      <Stack.Screen name="RecipeList" component={RecipeList} options={{ title: 'Recetas' }} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetail} options={{ title: 'Detalle' }} />
      <Stack.Screen name="AddRecipe" component={AddRecipe} options={{ title: 'Nueva Receta' }} />
    </Stack.Navigator>
  );
}
