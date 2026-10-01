import { View, Text, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../Context/AuthContext';
import styles from './Styles';

const isWeb = Platform.OS === 'web';

export default function HeaderAuth({ navigation }) {
  const { user, logout } = useAuth();

  if (user) {
    return (
      <TouchableOpacity style={styles.container} onPress={logout}>
        <Ionicons name="person-circle" size={20} color="#fff" />
        {isWeb && (
          <Text style={styles.text} numberOfLines={1}>Hola, {user.nombre}</Text>
        )}

        {isWeb && <View style={styles.divider} />}

        <Ionicons name="log-out-outline" size={20} color="#fff" />
        {isWeb && <Text style={styles.text}>Salir</Text>}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Login')}>
      {isWeb && <Text style={styles.text}>Iniciar sesión</Text>}
      <Ionicons name="person-circle-outline" size={22} color="#fff" />
    </TouchableOpacity>
  );
}