import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PieChart} from 'react-native-svg-charts';
import {useTheme} from '../hooks/useTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {darkTheme, lightTheme} from '../styles/GlobalStyles';
import {CategoryScreenStyles as style} from '../styles/CategoryScreenStyles';

const CategoryScreen = ({route, navigation}: any) => {
  const {theme} = useTheme();
  const styles = theme === 'dark' ? darkTheme : lightTheme;
  const {category} = route.params;

  const [products, setProducts] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

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

  const totalProducts = products.length;
  const completedProducts = products.filter(
    product => product.completed,
  ).length;
  const progress =
    totalProducts > 0 ? (completedProducts / totalProducts) * 100 : 0;

  const pieData =
    progress > 0
      ? [
          {key: 1, value: progress, svg: {fill: styles.accent.color}},
          {
            key: 2,
            value: 100 - progress,
            svg: {fill: styles.button.backgroundColor},
          },
        ]
      : [{key: 1, value: 1, svg: {fill: styles.button.backgroundColor}}];

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

  return (
    <View style={[styles.container, style.container]}>
      <Text style={[style.titleText, styles.text]}>{category}</Text>

      <View style={style.progressContainer}>
        <PieChart style={{height: 150, width: 150}} data={pieData} />
        <Text style={[style.progressText, styles.text]}>{`${Math.round(
          progress,
        )}%`}</Text>
        <Text style={[style.progressSubtitle, styles.text]}>Completado</Text>
      </View>

      <FlatList
        style={style.productList}
        data={products}
        keyExtractor={(item, index) => `${category}-${index}`}
        renderItem={({item, index}) => (
          <TouchableOpacity
            style={[
              style.productItem,
              {
                backgroundColor: item.completed
                  ? styles.button.backgroundColor
                  : styles.accent.color,
              },
            ]}
            onPress={() => toggleProductCompleted(index)}
            onLongPress={() => {
              setSelectedProduct(item);
              setModalVisible(true);
            }}>
            <Text
              style={[
                style.productName,
                styles.text,
                item.completed && {textDecorationLine: 'line-through'},
              ]}>
              {item.name}
            </Text>
            <Text
              style={[
                style.productName,
                styles.text,
                item.completed && {textDecorationLine: 'line-through'},
              ]}>
              x{item.quantity}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={[style.addButton, {backgroundColor: styles.accent.color}]}
        onPress={() => navigation.navigate('AddEditProduct', {category})}>
        <Icon name="plus" size={24} style={{color: '#FFF'}} />
      </TouchableOpacity>

      {selectedProduct && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}>
          <View style={style.modalOverlay}>
            <View style={style.modalContent}>
              <Text style={[style.modalTitle, styles.text]}>
                {selectedProduct.name}
              </Text>
              <TouchableOpacity
                style={[
                  style.modalButton,
                  {backgroundColor: styles.accent.color},
                ]}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('AddEditProduct', {
                    category,
                    product: selectedProduct,
                  });
                }}>
                <Text style={[styles.text, {color: '#FFF'}]}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  style.modalButton,
                  {backgroundColor: styles.button.backgroundColor},
                ]}
                onPress={deleteProduct}>
                <Text style={[styles.text, {color: styles.accent.color}]}>
                  Eliminar
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  style.modalButton,
                  {backgroundColor: styles.button.backgroundColor},
                ]}
                onPress={() => setModalVisible(false)}>
                <Text style={[styles.text, {color: styles.text.color}]}>
                  Cancelar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default CategoryScreen;
