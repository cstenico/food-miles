import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen.js';
import AuthLoadingScreen from '../containers/auth/AuthLoading';
import ShopScreen from '../screens/ShopScreenExample';
import ProductList from '../screens/ProductsListScreen';
import NewProductScreen from '../screens/SignupProduct';
import JustusScreen from '../screens/JustusScreen';

const AuthStack = createStackNavigator({ Home: HomeScreen, Login: LoginScreen, SignUp: SignUpScreen });
const FoodStack = createStackNavigator({MyShop: ShopScreen, ProductList: ProductList, NewProductScreen: NewProductScreen, JustusScreen: JustusScreen})

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Auth: AuthStack,
  AuthLoading: AuthLoadingScreen,
  Food: FoodStack, 
},
{
  initialRouteName: 'AuthLoading',
}));
