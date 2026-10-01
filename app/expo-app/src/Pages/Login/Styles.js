import { StyleSheet, Platform } from "react-native";
import { colors, spacing, radius } from "../../Constants/theme";

const styles = StyleSheet.create({

  // -- Contenedor principal --
  // Centra todo en pantalla. En web ocupa todo el viewport.
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

  // -- Layout responsive --
  // En web: formulario y cartel al costado (fila).
  // En celular: uno arriba del otro (columna).
  pageWrapper: {
    ...Platform.select({
      web: { flexDirection: "row", alignItems: "flex-start", gap: 24 },
      default: { flexDirection: "column", width: "100%" },
    }),
  },

  // Columna del formulario. En web le pongo ancho fijo para que no se estire.
  formCol: {
    ...Platform.select({
      web: { width: 340 },
      default: { width: "100%" },
    }),
  },

  // -- Avatar (la imagen redonda de arriba) --
  avatarContainer: {
    alignItems: "center",
    marginBottom: spacing.sm,
  },
  avatarWrapper: {
    width: 90,
    height: 90,
    borderRadius: 45,        // la mitad del width para que quede circular
    overflow: "hidden",      // corta lo que se pase del círculo
    alignSelf: "center",
    backgroundColor: "#fff8f8",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },

  // -- Título "Iniciar sesión" --
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    textAlign: "center",
    //fontFamily: 'Elsie',   // lo dejé comentado porque todavía no cargo esa fuente
  },

  // -- Campos de texto (email, contraseña) --
  input: {
    backgroundColor: "#fff",
    borderRadius: radius.card,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },

  // -- Mensaje de error (aparece solo si hay error) --
  error: {
    color: colors.primary,
    marginBottom: spacing.sm,
    textAlign: "center",
  },

  // -- Botón "Ingresar" --
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: radius.pill,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  // -- Link "¿No tenés cuenta? Registrate" --
  link: {
    color: colors.primary,
    textAlign: "center",
    marginTop: spacing.md,
  },
});

export default styles;