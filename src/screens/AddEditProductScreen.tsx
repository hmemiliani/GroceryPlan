import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useTheme} from '../hooks/useTheme';
import {AddEditProductStyles as style} from '../styles/AddEditProductStyles';
import {darkTheme, lightTheme} from '../styles/GlobalStyles';
import categories from '../constants/categories';
import {useAddEditProduct} from '../hooks/useAddEditProduct';

const AddEditProductScreen = ({route, navigation}: any) => {
  const {theme} = useTheme();
  const styles = theme === 'dark' ? darkTheme : lightTheme;

  const {product, category: initialCategory} = route.params || {};
  const {
    name,
    quantity,
    selectedCategory,
    setName,
    setQuantity,
    setSelectedCategory,
    saveProduct,
  } = useAddEditProduct({product, initialCategory, navigation});

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
