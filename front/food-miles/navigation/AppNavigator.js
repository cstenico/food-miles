import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen.js';
import AuthLoadingScreen from '../containers/auth/AuthLoading';


const AuthStack = createStackNavigator({ Home: HomeScreen, Login: LoginScreen, SignUp: SignUpScreen });

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
