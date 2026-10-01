import { useState } from "react"; // solo reacciona a lo que el usuario escribe
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import { useAuth } from "../../Context/AuthContext";
import styles from "./Styles";

export default function Login({ navigation }) {
  const { login } = useAuth(); // llama a la API, guarda el token y actualiza el estado global user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // al tocar Ingresar
    if (!email || !password) {
      setError("Completá email y contraseña");
      return;
    }
    setError("");
    setLoading(true); // limpia errores y activa spinner
    try {
      await login(email, password); // si funciona --> vuelve a la pantalla anterior del login
      navigation.goBack();
    } catch (err) {
      setError(err.message); // si el servidor rechaza
    } finally {
      setLoading(false); // saca spinner
    }
  };

  return (
    <View style={styles.container}>
      {/* pageWrapper: en web se acomoda en fila (form + cartelito al costado),
          en celular se apila en columna (cartelito abajo del form) */}
      <View style={styles.pageWrapper}>
        <View style={styles.formCol}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarWrapper}>
              <Image
                source={require("../../../assets/images/usuario_imagen.png")}
                style={styles.avatarImage}
                resizeMode="contain"
              />
            </View>
          </View>
          <Text style={styles.title}>Iniciar sesión</Text>

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry // pone puntitos para ocultarla
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Ingresar</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>¿No tenés cuenta? Registrate</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
