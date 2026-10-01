import { StyleSheet, Platform } from "react-native";
import { colors, spacing, radius } from "../../Constants/theme";

const styles = StyleSheet.create({
  // Contenedor principal
  // centra todo en la pantalla. En la web ocupa todo el viewport
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.lg,
    backgroundColor: colors.background,
    ...Platform.select({
      web: { width: "100vw", minHeight: "100vh" },
      default: {},
    }),
  },

  // LAYOUT RESPONSIVE
  // En web: formulario y cartel informativo
  // En celu uno arriba del otro
  pageWrapper: {
    ...Platform.select({
      web: { flexDirection: "row", alignItems: "flex-start", gap: 24 },
      default: { flexDirection: "column", width: "100%" },
    }),
  },
  // columna del formulario, en web tiene ancho fijo
  formCol: {
    ...Platform.select({
      web: { width: 340 },
      default: { width: "100%" },
    }),
  },
  // avatar
  avatarContainer: {
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  avatarImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    alignSelf: "center",
  },
  // titulo registrarse
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  // campos de texto
  input: {
    backgroundColor: "#fff",
    borderRadius: radius.card,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  // reglas de contraseña
  rulesBox: {
    marginBottom: spacing.sm,
    marginTop: -4,
  },
  // regla no cumplida en gris
  rule: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: "400",
    fontFamily: "Elsie",
  },
  // regla cumplida en verde
  ruleOk: {
    color: colors.secondary,
    fontWeight: "600",
  },
  // mensaje de error
  error: {
    color: colors.primary,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
  // boton de registrarse
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: radius.pill,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
  // link de ya tenes cuenta, inicia sesion
  link: {
    color: colors.primary,
    textAlign: "center",
    marginTop: spacing.md,
  },
  // cartel informativo
  infoCard: {
    backgroundColor: "#fff8f5", // crema
    borderLeftWidth: 4,
    borderLeftColor: colors.primary, // la rayita roja
    borderRadius: radius.card,
    padding: spacing.md,
    marginTop: Platform.OS === "web" ? 0 : spacing.lg,
    ...Platform.select({
      web: { width: 260 },
      default: { width: "100%" },
    }),
    // Sombra para que flote un poco
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  // Título del cartel ("¿Por qué registrarse?").
  infoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 12,
    textAlign: "center",
    fontFamily: "Sedan",
  },
  // Cada línea de info ("Valorá recetas", "Guardá favoritas", etc).
  infoLine: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 10,
    lineHeight: 20,
    fontFamily: "Quicksand",
    fontWeight: "500",
    textAlign: "center",
  },
});

export default styles;
