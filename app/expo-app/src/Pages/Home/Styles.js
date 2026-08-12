import { StyleSheet } from 'react-native';
import { colors, spacing, radius } from '../../Constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  titlePart: {
    fontSize: 28,
    fontWeight: '800',
  },
  featuredCard: {
    marginHorizontal: spacing.md,
    borderRadius: radius.card,
    overflow: 'hidden',
    height: 220,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  featuredOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: spacing.md,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  featuredTag: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.9)',
    color: '#111',
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radius.pill,
    marginBottom: 8,
  },
  featuredTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowRadius: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 24,
    marginHorizontal: spacing.md,
    marginBottom: 8,
  },
  horizontalList: {
    paddingLeft: spacing.md,
  },
  horizontalCardWrapper: {
    width: 220,
  },
  button: {
    backgroundColor: colors.primary,
    marginHorizontal: spacing.md,
    marginVertical: spacing.lg,
    paddingVertical: 14,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default styles;