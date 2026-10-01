import { StyleSheet } from "react-native";
import { colors, spacing, radius } from "../../Constants/theme";

const styles = StyleSheet.create({
  // Base -----
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  // Fila de arriba: buscador + botón de filtros, uno al lado del otro.
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  // campo de búsqueda
  searchInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: radius.pill,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 17,
    fontFamily: "ElsieSwashCaps-Regular",
  },

  // Botón "Filtros ▼" / "Filtros (2) ▲"
  filtersToggle: {
    marginLeft: spacing.sm,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: radius.pill,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: colors.border,
  },
  // filtros activos rojos
  filtersToggleActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filtersToggleText: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textPrimary,
    fontFamily: "ElsieSwashCaps-Regular",
  },
  filtersToggleTextActive: {
    color: "#ffffff",
  },

  // Panel desplegable con los 4 grupos de filtros
  // card blanca que aparece al tocarlo
  filtersPanel: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    padding: spacing.md,
    backgroundColor: "#fff",
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
  },
  // texto cargando filtros..
  filtersLoadingText: {
    color: colors.textSecondary,
    fontSize: 13,
    textAlign: "center",
    paddingVertical: 8,
  },
  // cada grupo de filtros 
  filterGroup: {
    marginBottom: spacing.md,
  },
  // titulo del grupo de filtros
  filterLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textPrimary,
    marginBottom: 6,
    fontFamily: "ElsieSwashCaps-Regular",
  },

  // Dificultad y Valoración mínima: pocas opciones fijas, van en fila que se puede partir (wrap)
  pillRowStatic: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  // Región y Etiquetas: pueden ser muchas, van en fila que se desliza (ScrollView horizontal)
  pillRow: {
    flexDirection: "row",
    gap: 8,
    paddingRight: spacing.md,
  },
  // pill en estado normal
  pill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: radius.pill,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  // pill seleccionada
  pillActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  // texto pill normal
  pillText: {
    fontSize: 13,
    color: colors.textPrimary,
    fontFamily: "Quicksand",
  },
  // texto pill seleccionada
  pillTextActive: {
    color: "#fff",
    fontWeight: "600",
  },
  // limpiar filtros
  clearFiltersButton: {
    alignSelf: "flex-start",
    marginTop: 4,
  },
  clearFiltersText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "600",
    textDecorationLine: "underline",
  },

  // contador resultados
  resultsCount: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.sm,
    fontSize: 13,
    color: colors.textSecondary,
  },
  // lista recetas
  listContent: {
    paddingVertical: 14,
    flexGrow: 1,
  },
  // spinner de carga
  loader: {
    marginVertical: 24,
  },
  // mensaje sin recetas
  empty: {
    textAlign: "center",
    marginTop: 40,
    color: colors.textSecondary,
  },
});

export default styles;
