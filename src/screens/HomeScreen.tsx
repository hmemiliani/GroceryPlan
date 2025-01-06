import React from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PieChart} from 'react-native-svg-charts';
import {HomeScreenStyles as style} from '../styles/HomeScreenStyles';
import {useTheme} from '../hooks/useTheme';
import ThemeToggle from '../components/ThemeToggle';
import {darkTheme, lightTheme} from '../styles/GlobalStyles';
import categories from '../constants/categories';
import {useHome} from '../hooks/useHome';

const HomeScreen = ({navigation}: any) => {
  const {theme} = useTheme();
  const styles = theme === 'dark' ? darkTheme : lightTheme;

  const {
    products,
    menuOpen,
    menuAnimation,
    progress,
    handleShare,
    handleResetAll,
    toggleMenu,
  } = useHome(navigation);

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
              <Text style={styles.text}>{category.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={[style.addButton, {backgroundColor: styles.accent.color}]}
        onPress={() => navigation.navigate('AddEditProduct')}>
        <Icon name="plus" size={24} style={styles.text} />
      </TouchableOpacity>

      <Animated.View
        style={[
          style.menuContainer,
          {
            opacity: menuAnimation,
            transform: [
              {
                translateY: menuAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [50, 0],
                }),
              },
            ],
          },
        ]}>
        <TouchableOpacity
          style={[style.menuButton, {backgroundColor: styles.accent.color}]}
          onPress={() => {
            handleShare();
            toggleMenu();
          }}>
          <Icon
            name="share-variant"
            size={24}
            style={{color: styles.text.color}}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[style.menuButton, {backgroundColor: styles.accent.color}]}
          onPress={handleResetAll}>
          <Icon
            name="trash-can-outline"
            size={24}
            style={{color: styles.text.color}}
          />
        </TouchableOpacity>
      </Animated.View>

      <TouchableOpacity
        style={[style.menuToggle, {backgroundColor: styles.accent.color}]}
        onPress={toggleMenu}>
        <Icon name="menu" size={24} style={{color: styles.text.color}} />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
