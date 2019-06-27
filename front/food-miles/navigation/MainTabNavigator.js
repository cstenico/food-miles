import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';


import FeedScreen from '../screens/FeedScreen';
import MyShopScreen from '../screens/MyShopScreen';
import NewProductScreen from '../screens/SignupProduct';
import ShopExtended from '../screens/ShopExtendedScreen';

const FeedStack = createStackNavigator({
  Feed: FeedScreen,
  ShopExtended: ShopExtended,
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

const MyShopStack = createStackNavigator({
  MyShop: MyShopScreen,
});

MyShopStack.navigationOptions = {
  tabBarLabel: 'Minha Loja',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-card${focused ? '' : '-outline'}`
          : 'md-card'
      }
    />
  ),
};

const NewProductStack = createStackNavigator({
  NewProduct: NewProductScreen,
});

NewProductStack.navigationOptions = {
  tabBarLabel: 'Novo Produto',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-pizza${focused ? '' : '-outline'}`
          : 'md-pizza'
      }
    />
  ),
};


export default createBottomTabNavigator({
  FeedStack,
  MyShopStack,
  NewProductStack
});
