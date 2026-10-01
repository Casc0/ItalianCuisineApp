// Mapa de rutas de la app, pantallas y navegación

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity } from "react-native";
import Home from "../Pages/Home/Home";
import RecipeList from "../Pages/RecipeList/RecipeList";
import RecipeDetail from "../Pages/RecipeDetail/RecipeDetail";
//port AddRecipe from "../Pages/AddRecipe/AddRecipe";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import HeaderAuth from "../Components/HeaderAuth/HeaderAuth";
import HeaderTitle from "../Components/HeaderTitle/HeaderTitle";

const Stack = createNativeStackNavigator();

// Arma la esquina derecha con los botones de home y login (HeaderAuth)
const makeHeaderRight = (navigation, iconName, targetRoute) => () => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      marginRight: 12,
    }}
  >
    <HeaderAuth navigation={navigation} />
    <TouchableOpacity onPress={() => navigation.navigate(targetRoute)}>
      <Ionicons name={iconName} size={24} color="#fff" />
    </TouchableOpacity>
  </View>
);

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          title: "Cocina Italiana",
          headerStyle: { backgroundColor: "#9c1f25" },
          headerTintColor: "#fff",
          headerRight: makeHeaderRight(navigation),
        })}
      />
      <Stack.Screen
        name="RecipeList"
        component={RecipeList}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderTitle />,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#ac1b22" },
          headerTintColor: "#fff",
          headerRight: makeHeaderRight(navigation, "home", "Home"),
        })}
      />
      <Stack.Screen
        name="RecipeDetail"
        component={RecipeDetail}
        options={({ navigation }) => ({
          // El título acá lo pisa RecipeDetail.js con el nombre real de la receta (navigation.setOptions)
          title: "Detalle",
          headerStyle: { backgroundColor: "#ac1b22" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontFamily: "Meie", fontSize: 22 },
          headerRight: makeHeaderRight(navigation, "home", "Home"),
        })}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={({ navigation }) => ({
          headerTitle: () => <HeaderTitle />,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#ac1b22" },
          headerTintColor: "#fff",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={{ marginRight: 12 }}
            >
              <Ionicons name="home" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Register" // nombre único --> lo usamos de id
        component={Register} // componente a renderizar
        options={({ navigation }) => ({
          // HEADER
          headerTitle: () => <HeaderTitle />,
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#ac1b22" },
          headerTintColor: "#fff",
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Home")}
              style={{ marginRight: 12 }}
            >
              <Ionicons name="home" size={24} color="#fff" />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
}
