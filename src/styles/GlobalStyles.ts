import {StyleSheet} from 'react-native';

export const darkTheme = StyleSheet.create({
  container: {backgroundColor: '#121212', flex: 1},
  text: {color: '#E0E0E0'},
  button: {backgroundColor: '#3b3b3b'},
  accent: {color: '#BB86FC'},
});

export const lightTheme = StyleSheet.create({
  container: {backgroundColor: '#F5F5F5', flex: 1},
  text: {color: '#2C2C2C'},
  button: {backgroundColor: '#b5b5b5'},
  accent: {color: '#b688f7'},
});
