import { useState } from "react";
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
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../Constants/theme";

export default function Register({ navigation }) {
  const { register } = useAuth();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // Validamos el formato de la contraseña
  // mínimo 8 caracteres, 1 mayúscula y 1 número
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

 const handleRegister = async () => {
  console.log('SE APRETÓ EL BOTÓN DE REGISTRARME');
  
  if (!nombre || !email || !password) {
    console.log('CORTADO: faltan campos', { nombre, email, password });
    setError("Completá todos los campos");
    return;
  }
  
  if (!hasMinLength || !hasUppercase || !hasNumber) {
    console.log('CORTADO: contraseña no cumple', { hasMinLength, hasUppercase, hasNumber });
    setError("La contraseña debe tener al menos 8 caracteres, una mayúscula y un número");
    return;
  }
  
  console.log('PASÓ LAS VALIDACIONES, llamando a register()...');
  setError("");
  setLoading(true);
  try {
    await register(nombre, email, password);
    console.log('register() TERMINÓ BIEN');
    navigation.goBack();
  } catch (err) {
    console.log('register() TIRÓ ERROR:', err.message);
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={styles.container}>
        <View style={styles.pageWrapper}>
            <View style={styles.formCol}>
      <View style={styles.avatarContainer}>
        <Image
          source={require("../../../assets/images/usuario_imagen.png")}
          style={styles.avatarImage}
        />
      </View>

      <Text style={styles.title}>Crear cuenta</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
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
        secureTextEntry
      />

      <View style={styles.rulesBox}>
        <Text style={[styles.rule, hasMinLength && styles.ruleOk]}>
          {hasMinLength ? "✓" : "○"} Mínimo 8 caracteres
        </Text>
        <Text style={[styles.rule, hasUppercase && styles.ruleOk]}>
          {hasUppercase ? "✓" : "○"} Una mayúscula
        </Text>
        <Text style={[styles.rule, hasNumber && styles.ruleOk]}>
          {hasNumber ? "✓" : "○"} Un número
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Registrarme</Text>
        )}
      </TouchableOpacity>
    </View>

    {/* Cartelito informativo */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>¿Por qué registrarte?</Text>
          <Text style={styles.infoLine}>⭐ Podés valorar las recetas</Text>
          <Text style={styles.infoLine}>📊 Nos ayudás a saber qué le gusta más a la gente</Text>
          <Text style={styles.infoLine}>🍝 Sumamos más recetas del estilo que más interesa</Text>
        </View>

    </View>
</View>

  );
}
