import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PieChart} from 'react-native-svg-charts';
import {HomeScreenStyles as style} from '../styles/HomeScreenStyles';
import {useTheme} from '../hooks/useTheme';
import ThemeToggle from '../components/ThemeToggle';
import AsyncStorage from '@react-native-async-storage/async-storage';
import categories from '../constants/categories';
import {darkTheme, lightTheme} from '../styles/GlobalStyles';

const HomeScreen = ({navigation}: any) => {
  const {theme} = useTheme();
  const styles = theme === 'dark' ? darkTheme : lightTheme;
  const [products, setProducts] = useState<Record<string, any[]>>({});

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

  return (
    <View style={[styles.container, style.container]}>
      <ThemeToggle />

      <View style={style.progressContainer}>
        <PieChart style={{height: 150, width: 150}} data={pieData} />
        <View style={style.containerText}>
          <Text style={[styles.text, style.progressText]}>{`${Math.round(
            progress,
          )}%`}</Text>
          <Text style={[styles.text]}>Completado</Text>
        </View>
      </View>

      <View style={style.categoriesContainer}>
        {categories.map(category => {
          const hasProducts = products[category.name]?.length > 0;
          return (
            <TouchableOpacity
              key={category.id}
              style={[
                style.categoryButton,
                {
                  backgroundColor: hasProducts
                    ? styles.accent.color
                    : styles.button.backgroundColor,
                },
              ]}
              onPress={() =>
                navigation.navigate('Category', {
                  category: category.name,
                  products: products[category.name] || [],
                })
              }>
              <Icon
                name={category.icon}
                size={40}
                style={[style.categoryIcon, styles.text]}
              />
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={[style.addButton, {backgroundColor: styles.accent.color}]}
        onPress={() => navigation.navigate('AddEditProduct')}>
        <Icon name="plus" size={24} style={{color: '#FFF'}} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
