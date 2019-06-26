import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Input, Item, Button, Right, H1, Thumbnail, Body, ListItem, StyleProvider, Container, Header, Content, Card, CardItem, Icon, Left} from 'native-base';
import axios from 'axios';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import ProductCard from '../components/ProductCard'; 

export default class ProductsListScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      category: this.props.navigation.getParam('category', ''),
      products_list: this.props.navigation.getParam('products_list', {}),
      seller_name: '',
      seller_picture: '',
      picture_url: '',
    }
  }

  onLogin = () => {

    console.log("email: " + String(this.state.email) + " password: " + String(this.state.password));

    axios.post('https://food-miles.herokuapp.com/login', {
      login: this.state.login,
      senha: this.state.senha,
    })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>

        {this.state.data}

        <Header transparent>
          <Left>
            <Button transparent
              onPress={() => {
                this.props.navigation.goBack()
              }}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body style={styles.v2}>
            <H1 style={styles.v1}>{this.state.category}</H1>
          </Body>
          <Right>
            <Image source={{uri: 'https://i.imgur.com/WJOAW4E.png'}} style={{height: 60, width: 40}}/>
          </Right>
        </Header>

        <Header transparent searchBar rounded>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Buscar produtos e lojinhas" />
          </Item>
          <Button transparent>
          </Button>
        </Header>

        <ScrollView vertical>
          {Object.keys(this.state.products_list).map(product => (
              <ProductCard key={this.state.products_list[product].name} product={(this.state.products_list[product])}>
              </ProductCard>
          ))}
        </ScrollView>

      </View>
    );
  }
}

//ESTILOS PARA CADA UM DOS COMPONENTES
const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#F4F7ED',
},
v1: {
  color: '#7FA99B',
  alignItems: 'center',
},
v2: {
  alignItems: 'center',
},
v8:{
  height: 80,
  width: 419,
},
MainContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  margin: 10,
},
});