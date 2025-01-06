import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {PieChart} from 'react-native-svg-charts';
import {useTheme} from '../hooks/useTheme';
import {darkTheme, lightTheme} from '../styles/GlobalStyles';
import {CategoryScreenStyles as style} from '../styles/CategoryScreenStyles';
import {useCategory} from '../hooks/useCategory';

const CategoryScreen = ({route, navigation}: any) => {
  const {theme} = useTheme();
  const styles = theme === 'dark' ? darkTheme : lightTheme;
  const {category} = route.params;

  const {
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
  } = useCategory({category, navigation});

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
                style.productQuantity,
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
        <Icon name="plus" size={24} style={styles.text} />
      </TouchableOpacity>

      <Animated.View
        style={[
          style.menuContainer,
          {
            opacity: menuAnimation,
            transform: [
              {
                translateX: menuAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, 0],
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
          onPress={handleResetCategory}>
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
