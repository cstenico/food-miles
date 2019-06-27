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
      //category: this.props.navigation.getParam('category', ''),
      category: 'Frutas',
      products_list: {
        "Laranja" : {
          "category" : "Frutas",
          "description" : "Laranja muito boa!",
          "name" : "Laranja",
          "picture_url" : "https://img.estadao.com.br/thumbs/640/resources/jpg/9/8/1527684459989.jpg",
          "price" : "10",
          "seller_email" : "kasama@orange.com",
          "seller_name" : "Justus",
          "seller_picture" : "https://pbs.twimg.com/profile_images/1035371242881265664/jwbIlX-2.jpg"
        },
        "Maçã" : {
          "category" : "Frutas",
          "description" : "Maçã deliciosa!",
          "name" : "Maçã",
          "picture_url" : "https://img.itdg.com.br/tdg/images/blog/uploads/2017/05/shutterstock_290834552.jpg",
          "price" : "100",
          "seller_email" : "kasama@apple.com",
          "seller_name" : "Justus",
          "seller_picture" : "https://pbs.twimg.com/profile_images/1035371242881265664/jwbIlX-2.jpg"
        }
      }
      ,
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