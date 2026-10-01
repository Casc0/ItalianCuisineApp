// Styles.js — StyleSheet for StarRating component
import { StyleSheet } from 'react-native';
import { colors, spacing } from '../../Constants/theme';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  summary: {
    fontSize: 14,
    fontFamily:'Quicksand',
    color: colors.textSecondary,
    marginBottom: 8,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 4,
  },
  star: {
    fontSize: 32,
    color: '#ccc',


  },
  starFilled: {
    color: colors.rating,
  },
  thanks: {
    marginTop: 6,
    fontSize: 13,
    fontFamily:'Quicksand',
    color: colors.secondary,
    fontWeight: '600',
  },
});

export default styles;