import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '../hooks/useTheme';

const ThemeToggle = () => {
  const {theme, toggleTheme} = useTheme();

  return (
    <TouchableOpacity style={styles.button} onPress={toggleTheme}>
      <Icon
        name={theme === 'dark' ? 'white-balance-sunny' : 'moon-waning-crescent'}
        size={24}
        color={theme === 'dark' ? '#E0E0E0' : '#2C2C2C'}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
  },
});

export default ThemeToggle;
