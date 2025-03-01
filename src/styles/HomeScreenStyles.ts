import {StyleSheet} from 'react-native';

export const HomeScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  progressContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 26,
    marginTop: 46,
  },
  progressText: {
    fontSize: 60,
    fontWeight: 'bold',
  },
  progressSubtitle: {
    fontSize: 19,
  },
  categoriesContainer: {
    flex: 1,
    marginTop: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    width: '30%',
    aspectRatio: 0.8,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  categoryIcon: {
    fontSize: 44,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
    elevation: 5,
  },
  menuToggle: {
    position: 'absolute',
    width: 56,
    height: 56,
    bottom: 16,
    left: 20,
    padding: 12,
    borderRadius: 50,
    elevation: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  menuContainer: {
    position: 'absolute',
    left: 20,
    bottom: 80,
    alignItems: 'center',
    zIndex: 10,
    
  },
  
  menuButton: {
    marginBottom: 10,
    width: 56,
    height: 56,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  
});
