import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useTheme} from '../hooks/useTheme';
import {AddEditProductStyles as style} from '../styles/AddEditProductStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {darkTheme, lightTheme} from '../styles/GlobalStyles';
import categories from '../constants/categories';

const AddEditProductScreen = ({route, navigation}: any) => {
  const {theme} = useTheme();
  const styles = theme === 'dark' ? darkTheme : lightTheme;

  const {product, category: initialCategory} = route.params || {};

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
        const updatedProducts = currentCategoryProducts.map(p =>
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
          allProducts[product.category] = currentCategoryProducts.filter(
            p => p.id !== product.id,
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

  return (
    <View style={[styles.container, style.container]}>
      <Text style={[style.headerText, styles.text]}>
        {product ? 'Editar Producto' : 'Agregar Producto'}
      </Text>

      <TextInput
        style={[style.textInput, {borderColor: styles.accent.color}]}
        placeholder="Nombre del producto"
        placeholderTextColor={styles.text.color}
        value={name}
        onChangeText={setName}
      />

      <TextInput
        style={[style.textInput, {borderColor: styles.accent.color}]}
        placeholder="Cantidad"
        placeholderTextColor={styles.text.color}
        keyboardType="numeric"
        value={quantity}
        onChangeText={setQuantity}
      />

      <View style={[style.pickerContainer, {borderColor: styles.accent.color}]}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={itemValue => setSelectedCategory(itemValue)}
          style={{color: styles.text.color}}>
          {categories.map(category => (
            <Picker.Item
              key={category.id}
              label={category.name}
              value={category.name}
            />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        style={[style.saveButton, {backgroundColor: styles.accent.color}]}
        onPress={saveProduct}>
        <Text style={[styles.text, {color: '#FFF'}]}>
          {product ? 'Guardar Cambios' : 'Agregar Producto'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddEditProductScreen;
