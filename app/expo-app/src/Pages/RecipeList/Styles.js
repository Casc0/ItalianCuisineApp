import { StyleSheet } from 'react-native';
import { colors } from '../../Constants/theme';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    flexGrow: 1,
    backgroundColor: colors.background,
  },
  loader: {
    marginVertical: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: colors.textSecondary,
  },
});

export default styles;