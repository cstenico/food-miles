import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen.js';
import AuthLoadingScreen from '../containers/auth/AuthLoading';
import SignupProduct from './screens/SignupProduct';
import CarouselScreen from './screens/CarouselScreen';
import ProductsListScreen from './screens/ProductsListScreen';

const AuthStack = createStackNavigator({ Home: HomeScreen, Login: LoginScreen, SignUp: SignUpScreen , Product: SignupProduct , Carousel: CarouselScreen , ProductsList: ProductsListScreen});

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
  Auth: AuthStack,
  AuthLoading: AuthLoadingScreen,
},
{
  initialRouteName: 'AuthLoading',
}));
