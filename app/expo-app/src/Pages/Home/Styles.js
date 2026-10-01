import { StyleSheet } from "react-native";
import { colors, spacing, radius } from "../../Constants/theme";

const styles = StyleSheet.create({

  // PANTALLA
  container: {
    // fondo de la pantalla
    flex: 1,
    backgroundColor: colors.background,
  },
  loaderContainer: {
    // centra el spinner mientras carga
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },

  // FILA LOGIN/LOGOUT
  authRow: {
    // fila que alinea a la derecha
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingTop: 12,
    gap: 10,
  },
  authText: {
    // texto gris
    fontSize: 13,
    color: colors.textSecondary,
  },
  authLink: {
    // cerrar sesion
    fontSize: 13,
    color: colors.primary,
    fontWeight: "600",
    textDecorationLine: "underline",
  },

  // TITULO
  titleRow: {
    // fila que centra las tres partes del titulo
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 24,
    marginBottom: 16,
  },
  titlePart: {
    // cada pedazo de texto
    fontSize: 50,
    fontWeight: "800",
    fontFamily: "Meie",
  },

  // RECETA DESTACADA
  featuredCard: {
    // contenedor con bordes redondeados
    marginHorizontal: spacing.md,
    borderRadius: radius.card,
    overflow: "hidden",
    height: 220,
  },
  featuredImage: {
    // foto de fondo
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  featuredOverlay: {
    // capa oscura semi-transparente encima de la imagen
    flex: 1,
    justifyContent: "flex-end",
    padding: spacing.md,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  featuredTag: {
    // etiqueta blanca de características
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.9)",
    color: "#111",
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    marginBottom: 8,
  },
  featuredTitle: {
    // nombre de la receta 
    color: "#fff",
    fontSize: 30,
    fontWeight: "200",
    textShadowColor: "rgba(0,0,0,0.6)",
    textShadowRadius: 6,
    fontFamily: "Sedan",
  },

  // DIVISOR DECORATIVO
  dividerRow: {
    // contenedor del divisor y el titulo de la seccion
    flexDirection: "row",
    height: 40,
    position: "relative",
    alignItems: "center",
    marginTop: 24,
    marginBottom: 80,
    marginHorizontal: spacing.md,
  },
  dividerImage: {
    // imagen decorativa 
    position: "absolute",
    width: "100%",
    height: 250,
    marginTop: -10,
  },
  sectionTitleWrapper: {
    // pastilla verde detras del texto
    position: "absolute",
    left: 0,
    alignSelf: "flex-start",
    backgroundColor: "#d1dbd1",
    paddingHorizontal: 10,
    paddingVertical: 1,
    borderRadius: 999,
    marginTop: 24,
    marginHorizontal: spacing.md,
    marginBottom: 16,
    marginRight: 10,
  },
  sectionTitle: {
    // recetas para explorar, sobre la pastilla verde 
    fontSize: 35,
    fontWeight: "600",
    color: colors.textPrimary,
    marginTop: 30,
    marginHorizontal: spacing.md,
    marginBottom: 16,
    fontFamily: "Tangerine",
  },

  // CARRUSEL HORIZONTAL
  horizontalList: {
    // padding del flatlist horizontal
    paddingLeft: spacing.md,
    paddingVertical: 35,
  },
  horizontalCardWrapper: {
    // ancho de cada card
    width: 220,
  },

  // BOTON FINAL
  button: {
    // boton ver todas las recetas
    backgroundColor: "#ac1b22",
    marginHorizontal: spacing.md,
    marginVertical: spacing.lg,
    paddingVertical: 14,
    borderRadius: radius.pill,
    alignItems: "center",
  },
  buttonText: {
    // texto blanco del boton
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },

});

export default styles;
