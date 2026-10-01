import { StyleSheet, Platform } from "react-native";
import { colors, spacing, radius } from "../../Constants/theme";

const styles = StyleSheet.create({
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
  pageWrapper: {
    ...Platform.select({
      web: { flexDirection: "row", alignItems: "flex-start", gap: 24 },
      default: { flexDirection: "column", width: "100%" },
    }),
  },
  formCol: {
    ...Platform.select({
      web: { width: 340 },
      default: { width: "100%" },
    }),
  },
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
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: radius.card,
    paddingHorizontal: 18,
    paddingVertical: 12,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rulesBox: {
    marginBottom: spacing.sm,
    marginTop: -4,
  },
  rule: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: "400",
    fontFamily: "Elsie",
  },
  ruleOk: {
    color: colors.secondary,
    fontWeight: "600",
  },
  error: {
    color: colors.primary,
    marginBottom: spacing.sm,
    textAlign: "center",
  },
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
  link: {
    color: colors.primary,
    textAlign: "center",
    marginTop: spacing.md,
  },

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
