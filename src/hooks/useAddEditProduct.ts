import {useState} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import categories from '../constants/categories';

interface UseAddEditProductProps {
  product?: any;
  initialCategory?: string;
  navigation: any;
}

export const useAddEditProduct = ({
  product,
  initialCategory,
  navigation,
}: UseAddEditProductProps) => {
  const [name, setName] = useState(product?.name || '');
  const [quantity, setQuantity] = useState(
    product?.quantity !== undefined ? product.quantity.toString() : '1',
  );
  const [selectedCategory, setSelectedCategory] = useState(
    product?.category || initialCategory || categories[0].name,
  );

  const saveProduct = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'El nombre del producto no puede estar vacío.');
      return;
    }

    try {
      const storedProducts = await AsyncStorage.getItem('products');
      const allProducts = storedProducts ? JSON.parse(storedProducts) : {};

      const currentCategoryProducts =
        allProducts[product?.category || selectedCategory] || [];

      if (product?.id) {
        // Update existing product
        const updatedProducts = currentCategoryProducts.map((p: any) =>
          p.id === product.id
            ? {
                ...p,
                name,
                quantity: parseInt(quantity),
                category: selectedCategory,
              }
            : p,
        );

        if (product.category !== selectedCategory) {
          // Move product to new category
          allProducts[product.category] = currentCategoryProducts.filter(
            (p: any) => p.id !== product.id,
          );

          allProducts[selectedCategory] = [
            ...(allProducts[selectedCategory] || []),
            {
              id: product.id,
              name,
              quantity: parseInt(quantity),
              category: selectedCategory,
              completed: product.completed || false,
            },
          ];
        } else {
          allProducts[product.category] = updatedProducts;
        }
      } else {
        // Add new product
        const newProduct = {
          id: Date.now().toString(),
          name,
          quantity: parseInt(quantity),
          category: selectedCategory,
          completed: false,
        };
        allProducts[selectedCategory] = [
          ...(allProducts[selectedCategory] || []),
          newProduct,
        ];
      }

      await AsyncStorage.setItem('products', JSON.stringify(allProducts));

      navigation.goBack();
    } catch (error) {
      console.error('Error saving product:', error);
      Alert.alert('Error', 'No se pudo guardar el producto.');
    }
  };

  return {
    name,
    quantity,
    selectedCategory,
    setName,
    setQuantity,
    setSelectedCategory,
    saveProduct,
  };
};
