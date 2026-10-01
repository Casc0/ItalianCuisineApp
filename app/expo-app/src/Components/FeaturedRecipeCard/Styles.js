// Styles.js — StyleSheet for FeaturedRecipeCard component
import { StyleSheet } from "react-native";
import { colors, spacing, radius } from "../../Constants/theme";

const styles = StyleSheet.create({
  card: {
    marginHorizontal: spacing.md,
    borderRadius: radius.card,
    height: 280,
  },

  face: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backfaceVisibility: "hidden",
    borderRadius: radius.card,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    padding: spacing.sm,
    backgroundColor: "rgba(0, 0, 0, 0.14)",
    paddingLeft: 10,
  },
  tag: {
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
  titleBox: {
    backgroundColor: "rgba(0,0,0,0.45)",
    alignSelf: "flex-start",

    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontFamily: "Sedan",
    fontWeight: "300",
    textShadowColor: "#000000",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 4,
  },
  back: {
    justifyContent: "flex-start",
    // sin padding acá — lo manejan backTouchArea y backButton por separado
  },
  backImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: radius.card,
  },
  backDarkOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: radius.card,
    backgroundColor: "rgba(0,0,0,0.55)",
  },
  backTouchArea: {
    paddingTop: 10,
    paddingLeft: 28,
    paddingRight: spacing.sm,
  },
  backTitle: {
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "500",
    marginBottom: 10,
    fontFamily: "Sedan",
  },
  backItem: {
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 4,
    fontFamily: "Quicksand",
  },
  backButton: {
    position: "absolute",
    bottom: 12,
    left: 28,
    zIndex: 10,
    backgroundColor: "rgba(211, 38, 32, 0.8)", 
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  backButtonText: {
    color: "#ffffff",
    fontWeight: "700",
    textDecorationLine: "underline",
    fontFamily: "Quicksand",
  },
});

export default styles;
