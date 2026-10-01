// Styles.js — StyleSheet for RecipeCard component
import { StyleSheet } from "react-native";
import { colors, spacing, radius } from "../../Constants/theme";

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: radius.card,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
    // sombra sutil, como .recipe-minimal
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: radius.image,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: "60",
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    fontFamily: "Sedan",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    rowGap: 6, // espacio entre filas (si los tags saltan de línea)
    columnGap: 6, // espacio entre tags de la misma fila
    marginBottom: spacing.sm,
  },
  tag: {
    //backgroundColor: colors.tagBackground,
    backgroundColor: "#d1dbd1",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6, // bordes un poco menos redondeados
    borderWidth: 1,
    borderColor: colors.border, // un borde sutil
  },
  tagText: {
    color: colors.tagText,
    fontSize: 12,
    fontFamily: "Quicksand",
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    color: colors.rating,
    fontWeight: "600",
  },
  region: {
    fontSize: 20,
    color: colors.textSecondary,
    fontFamily: "Carattere",
  },
});

export default styles;
