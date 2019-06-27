import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import FeedScreen from '../screens/FeedScreen';
import ShopScreen from '../screens/ShopScreenExample';
import NewProductScreen from '../screens/SignupProduct';


import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProductsList from '../screens/ProductsListScreen';
import JustusScreen from '../screens/JustusScreen';
import CarousselScreen from '../screens/CarouselScreen';

const FeedStack = createStackNavigator({
  Feed: {screen: FeedScreen},
});

FeedStack.navigationOptions = {
  tabBarLabel: 'Feed',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const ShopStack = createStackNavigator({
  Shop: {screen: ShopScreen},
});

ShopStack.navigationOptions = {
  tabBarLabel: 'Minha Loja',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const NewProductStack = createStackNavigator({
  NewProduct: {screen: NewProductScreen},
});

NewProductStack.navigationOptions = {
  tabBarLabel: 'Novo Produto',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const JustusStack = createStackNavigator({
  Justus: {screen: JustusScreen},
});

JustusStack.navigationOptions = {
  tabBarLabel: 'Lojas',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const ProductsListStack = createStackNavigator({
  Products: {screen: ProductsList},
});

ProductsListStack.navigationOptions = {
  tabBarLabel: 'Produtos',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

export default createBottomTabNavigator({
  FeedStack,
  ShopStack,
  NewProductStack,
  ProductsListStack,
  JustusStack
});
