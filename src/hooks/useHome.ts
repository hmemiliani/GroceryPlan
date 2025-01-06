import {useState, useEffect} from 'react';
import {Alert, Animated} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useShareableList} from './useShareableList';
import Share from 'react-native-share';

export const useHome = (navigation: any) => {
  const [products, setProducts] = useState<Record<string, any[]>>({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuAnimation] = useState(new Animated.Value(0));
  const {formatAllCategories} = useShareableList();

  const loadProducts = async () => {
    try {
      const storedProducts = await AsyncStorage.getItem('products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        setProducts({});
      }
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
    const formattedList = formatAllCategories(products);
    try {
      await Share.open({
        title: 'Lista de Productos Pendientes',
        message: formattedList,
      });
    } catch (error) {
      if (error.message !== 'User did not share') {
        Alert.alert('Error', 'No se pudo compartir la lista.');
      }
    }
  };

  // Reset all products
  const handleResetAll = async () => {
    Alert.alert(
      'Vaciar Lista',
      '¿Estás seguro de que quieres vaciar toda la lista de compras?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Vaciar',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('products');
              setProducts({});
            } catch (error) {
              console.error('Error resetting list:', error);
              Alert.alert('Error', 'No se pudo vaciar la lista.');
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

  const totalProducts = Object.values(products).reduce(
    (sum, categoryProducts) => sum + categoryProducts.length,
    0,
  );

  const completedProducts = Object.values(products).reduce(
    (sum, categoryProducts) =>
      sum + categoryProducts.filter(product => product.completed).length,
    0,
  );

  const progress =
    totalProducts > 0 ? (completedProducts / totalProducts) * 100 : 0;

  return {
    products,
    menuOpen,
    menuAnimation,
    progress,
    loadProducts,
    handleShare,
    handleResetAll,
    toggleMenu,
  };
};
