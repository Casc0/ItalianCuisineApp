import { useFonts } from 'expo-font';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/Routes/AppNavigator';
import { AuthProvider } from './src/Context/AuthContext';

export default function App() {
  const [fontsLoaded] = useFonts({
    Meie: require('./assets/fonts/MeieScript-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#CD212A" />
      </View>
    );
  }

  return (
    
    <AuthProvider>
      <StatusBar style="light" />
      
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      </AuthProvider>
    
  );
}
