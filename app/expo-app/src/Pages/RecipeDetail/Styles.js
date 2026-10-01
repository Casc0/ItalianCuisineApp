import { StyleSheet } from "react-native";
import { colors, spacing, radius } from "../../Constants/theme";

const styles = StyleSheet.create({

  // -- Base --
  // Fondo de toda la pantalla de detalle.
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Spinner centrado mientras cargan los datos.
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  // -- Imagen principal de la receta --
  image: {
    width: "100%",
    height: 260,
  },

  // -- Contenido debajo de la imagen --
  // Envuelve todo: título, descripción, badges, rating, ingredientes, pasos, consejo.
  content: {
    padding: spacing.md,
  },

  // -- Título y descripción --
  // El nombre de la receta bien grande, con la fuente Carattere.
  title: {
    fontSize: 70,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 8,
    fontFamily: "Carattere",
  },
  // La descripción corta debajo del nombre.
  description: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.md,
    fontWeight: 500,
    fontFamily: "Quicksand",
  },

  // -- Badges (tiempo, dificultad, porciones, región) --
  // Fila que se parte sola si no caben todos en una línea (flexWrap).
  badgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  // Cada badge individual (pastillita gris).
  badge: {
    backgroundColor: colors.tagBackground,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },
  badgeText: {
    fontSize: 17,
    color: colors.tagText,
    fontFamily: "Quicksand",
  },

  // -- Valoración (estrellitas + promedio) --
  // Fila con la pill de estrellas y el texto "4.2 (12 valoraciones)".
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.lg,
    gap: 10,
  },
  // La pill gris oscura que contiene las 5 estrellas.
  ratingPill: {
    flexDirection: "row",
    backgroundColor: "#9c9c9c",
    borderRadius: radius.pill,
    borderWidth: 2,
    borderColor: "#4a4a4a",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  ratingStar: {
    marginHorizontal: 2,
  },
  // Texto del promedio y total al lado de las estrellas.
  ratingCount: {
    fontSize: 14,
    color: colors.rating,
    fontWeight: "600",
    fontFamily: "Quicksand",
  },
  // Texto simple de rating (se usa en otros lados).
  rating: {
    fontSize: 17,
    fontFamily: "Quicksand",
    color: colors.rating,
    fontWeight: "600",
    marginBottom: spacing.lg,
  },

  // -- Componente StarRating (para votar) --
  // Caja con borde dorado y sombra sutil que envuelve las estrellas para votar.
  ratingBox: {
    backgroundColor: colors.cardBackground,
    borderRadius: radius.card,
    padding: spacing.md,
    marginBottom: spacing.md,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFE9A8",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,               // sombra en Android
  },

  // -- Prompt de login (si no está logueado) --
  // Cartel que dice "Iniciá sesión para valorar esta receta →".
  loginPrompt: {
    backgroundColor: colors.tagBackground,
    padding: spacing.md,
    borderRadius: radius.card,
    alignItems: "center",
    marginVertical: spacing.md,
  },
  loginPromptText: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 20,
    fontFamily: "Sedan",
  },
  loginPromptInner: {
    alignItems: "center",
  },

  // -- Secciones de Ingredientes y Preparación --
  // Card blanca con borde gris que agrupa el contenido.
  section: {
    backgroundColor: colors.cardBackground,
    borderRadius: radius.card,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  // Título de la sección ("Ingredientes", "Preparación").
  sectionHeading: {
    fontSize: 30,
    fontFamily: "Sedan",
    fontWeight: "600",
    paddingBottom: 30,
    color: colors.textPrimary,
    marginBottom: 10,
    marginLeft: 30,
  },

  // -- Ingredientes --
  // Cada fila: bolita roja + texto del ingrediente, separados por una línea fina.
  ingredientRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  // El último ingrediente no lleva línea abajo para no duplicar con el borde de la section.
  ingredientRowLast: {
    borderBottomWidth: 0,
  },
  ingredientBullet: {
    fontSize: 18,
    color: colors.primary,
    marginRight: 8,
    fontFamily: "Quicksand",
  },
  ingredientText: {
    flex: 1,                    // ocupa todo el espacio que sobra después de la bolita
    fontSize: 15,
    fontFamily: "Quicksand",
    fontWeight: "500",
    color: colors.textPrimary,
    lineHeight: 22,
  },

  // -- Pasos de preparación --
  // Cada paso: circulito rojo con el número + texto de la instrucción.
  stepRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  // El circulito rojo con el número del paso.
  stepNumber: {
    width: 26,
    height: 26,
    borderRadius: 13,           // mitad del width = círculo perfecto
    backgroundColor: colors.primary,
    color: "#fff",
    textAlign: "center",
    lineHeight: 26,             // centra el número verticalmente
    fontWeight: "700",
    fontSize: 13,
    marginRight: 10,
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
    paddingBottom: 10,
    lineHeight: 21,
    fontFamily: "Quicksand",
    fontWeight: 500,
  },

  // -- Consejo del chef --
  // Caja amarilla suave con el tip.
  tipBox: {
    backgroundColor: "#FFF8E1",
    borderRadius: radius.card,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 4,
    fontFamily: "Quicksand",
  },
  tipText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontStyle: "italic",
    lineHeight: 20,
    fontFamily: "Quicksand",
  },

  // -- Recetas similares (carrusel horizontal de abajo) --
  similarSection: {
    marginBottom: spacing.lg,
  },
  // Pastillita verde con el título "Recetas para explorar".
  similarTitleWrapper: {
    alignSelf: "flex-start",
    backgroundColor: "#d1dbd1",
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 999,
    marginHorizontal: spacing.md,
    marginBottom: 16,
  },
  similarTitleText: {
    fontSize: 35,
    fontWeight: "600",
    color: colors.textPrimary,
    marginTop: 30,
    marginBottom: 16,
    fontFamily: "Tangerine",
  },
  similarList: {
    paddingLeft: spacing.md,
    paddingVertical: 35,
  },
  similarCardWrapper: {
    width: 200,
  },

  // -- Botón "Ver todas las recetas" --
  button: {
    backgroundColor: "#ac1b22",
    marginHorizontal: spacing.md,
    marginVertical: spacing.lg,
    paddingVertical: 14,
    borderRadius: radius.pill,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default styles;