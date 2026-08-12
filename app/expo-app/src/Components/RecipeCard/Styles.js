// Styles.js — StyleSheet for RecipeCard component
import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../Constants/theme';

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
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: radius.image,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: spacing.sm,
  },
  tag: {
    backgroundColor: colors.tagBackground,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  tagText: {
    color: colors.tagText,
    fontSize: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    color: colors.rating,
    fontWeight: '600',
  },
  region: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});

export default styles;