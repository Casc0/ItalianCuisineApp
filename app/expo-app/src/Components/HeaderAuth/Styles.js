import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    maxWidth: 200,
  },
  text: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  divider: {
    width: 1,
    height: 16,
    backgroundColor: 'rgba(255,255,255,0.4)',
    marginHorizontal: 4,
  },
});

export default styles;