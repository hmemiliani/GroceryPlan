import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import CategoryScreen from '../screens/CategoryScreen';
import AddEditProductScreen from '../screens/AddEditProductScreen';
import SplashScreen from '../screens/SplashScreen';
import {RootStackParamList} from '../types/NavigationTypes';

const Stack = createStackNavigator<RootStackParamList>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Category" component={CategoryScreen} />
        <Stack.Screen name="AddEditProduct" component={AddEditProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
