import {StyleSheet} from 'react-native';

export const CategoryScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  progressContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  progressSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  productList: {
    flex: 1,
    marginTop: 16,
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginVertical: 4,
    borderRadius: 8,
    elevation: 2,
    backgroundColor: '#FFF',
  },
  productName: {
    fontSize: 16,
    flex: 1,
  },
  productQuantity: {
    fontSize: 16,
    right: 10,
  },
  iconButton: {
    marginHorizontal: 8,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    borderRadius: 50,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#FFF',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalButton: {
    padding: 12,
    marginTop: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
});
