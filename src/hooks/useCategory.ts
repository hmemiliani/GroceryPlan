import {useState, useEffect} from 'react';
import {Alert, Animated} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useShareableList} from './useShareableList';
import Share from 'react-native-share';

interface UseCategoryProps {
  category: string;
  navigation: any;
}

export const useCategory = ({category, navigation}: UseCategoryProps) => {
  const [products, setProducts] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnimation] = useState(new Animated.Value(0));
  const {formatCategoryList} = useShareableList();

  const loadProducts = async () => {
    try {
      const storedProducts = await AsyncStorage.getItem('products');
      const allProducts = storedProducts ? JSON.parse(storedProducts) : {};
      setProducts(allProducts[category] || []);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadProducts);
    loadProducts();
    return unsubscribe;
  }, [navigation]);

  const handleShare = async () => {
    const formattedList = formatCategoryList(category, products);
    try {
      await Share.open({
        title: `Lista de Productos Pendientes - ${category}`,
        message: formattedList,
      });
    } catch (error) {
      if (error.message !== 'User did not share') {
        Alert.alert('Error', 'No se pudo compartir la lista.');
      }
    }
  };

  const handleResetCategory = async () => {
    Alert.alert(
      'Vaciar Categoría',
      `¿Estás seguro de que quieres vaciar la categoría "${category}"?`,
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Vaciar',
          style: 'destructive',
          onPress: async () => {
            try {
              const storedProducts = await AsyncStorage.getItem('products');
              const allProducts = storedProducts
                ? JSON.parse(storedProducts)
                : {};
              delete allProducts[category];
              await AsyncStorage.setItem(
                'products',
                JSON.stringify(allProducts),
              );
              setProducts([]);
            } catch (error) {
              console.error('Error resetting category:', error);
              Alert.alert('Error', 'No se pudo vaciar la categoría.');
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    Animated.timing(menuAnimation, {
      toValue: menuOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const toggleProductCompleted = async (index: number) => {
    const updatedProducts = [...products];
    updatedProducts[index].completed = !updatedProducts[index].completed;
    setProducts(updatedProducts);

    const storedProducts = await AsyncStorage.getItem('products');
    const allProducts = storedProducts ? JSON.parse(storedProducts) : {};
    allProducts[category] = updatedProducts;
    await AsyncStorage.setItem('products', JSON.stringify(allProducts));
  };

  const deleteProduct = async () => {
    const updatedProducts = products.filter(
      product => product !== selectedProduct,
    );
    setProducts(updatedProducts);

    const storedProducts = await AsyncStorage.getItem('products');
    const allProducts = storedProducts ? JSON.parse(storedProducts) : {};
    allProducts[category] = updatedProducts;
    await AsyncStorage.setItem('products', JSON.stringify(allProducts));
    setModalVisible(false);
  };

  const totalProducts = products.length;
  const completedProducts = products.filter(
    product => product.completed,
  ).length;
  const progress =
    totalProducts > 0 ? (completedProducts / totalProducts) * 100 : 0;

  return {
    products,
    modalVisible,
    setModalVisible,
    selectedProduct,
    setSelectedProduct,
    menuOpen,
    menuAnimation,
    progress,
    toggleMenu,
    handleShare,
    handleResetCategory,
    toggleProductCompleted,
    deleteProduct,
  };
};
