import React from 'react';
import { Text, Content, H1, Thumbnail, Left, Right, Body, Card, CardItem} from 'native-base';
import {View, Image,  ImageBackground, StyleSheet, TouchableOpacity,ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button,SearchBar,ThemeProvider } from 'react-native-elements';
import {AsyncStorage} from 'react-native';
import axios from 'axios'
import ProductsCard from '../components/ProductCard'
import { StackNavigator } from 'react-navigation';


export default class MyShopScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      address: '',
      telephone: '',
      loading: true,
      store: []
      //store: {}
    }
  }

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('email');
      if (value !== null) {
        this.setState({email: value})
        console.log(value);
        this.getMyShop();
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  getMyShop(){
    axios.get('https://food-miles-dev-filao.herokuapp.com/store?seller_email=' + this.state.email)
    .then(response => response.data)
    .then((response) =>  {
      console.log(response)
      this.setState({...this.state, loading: false, store: response});
    })
    .catch((error) => {
      console.error(error);
    })
  }

  componentDidMount() {
    this._retrieveData();
    //this.getMyShop();
  }

  render() {
    if(this.state.store.length == 0){
      return (
        <View style={ styles.container }>
          <Content contentContainerStyle ={{paddingTop: 50, paddingHorizontal: 10}}>
              <ActivityIndicator size="large" animating={this.state.loading} />
              <Card transparent style={styles.cardStyle}>
                <CardItem style={styles.cardStyle}>
                  <Left>
                    <Button 
                      containerStyle = {[{width: 50}]}
                      type = "clear"
                      icon={
                        <Icon
                          name="arrow-left"
                          size={24}
                          color='black'
                        />
                      }
                    />
                  </Left>
                  <Right>
                  <H1>Minha Loja</H1>
                  </Right>
                </CardItem> 
                <CardItem style={styles.cardStyle}>
                  
                      <Text style={styles.textShopName}>Você ainda não tem produtos cadastrados! Comece agora colocando um produto</Text>
                    
                </CardItem>
              </Card>
          </Content> 
        </View>
      );
    }else{
    return (
      <View style={ styles.container }>
        <Content contentContainerStyle ={{paddingTop: 50, paddingHorizontal: 10}}>
            <ActivityIndicator size="large" animating={this.state.loading} />
            <Card transparent style={styles.cardStyle}>
              <CardItem style={styles.cardStyle}>
                <Left>
                  <Button 
                    containerStyle = {[{width: 50}]}
                    type = "clear"
                    icon={
                      <Icon
                        name="arrow-left"
                        size={24}
                        color='black'
                      />
                    }
                  />
                </Left>
                <Right>
                <H1>Minha Loja</H1>
                </Right>
              </CardItem> 
              <CardItem style={styles.cardStyle}>
                <Left>
                  <Thumbnail source={{uri: this.state.store[0].seller_picture}} />
                  <Body>
                    <Text style={styles.textShopName}>{this.state.store[0].seller_name}</Text>
                    <Text style={styles.textAddress}>{this.state.store[0].seller_address}</Text>
                    <Text style={styles.text}> {this.state.store[0].seller_name}, vendo produtos feitos em casa. Entre em contato!</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
            {
                        Object.keys(this.state.store).map((produtos) => (
                            <View key={this.state.store[produtos].name}>
                                <ProductsCard
                                        product={this.state.store[produtos]}
                                    >
                                </ProductsCard>
                            </View>
                        ))
                    }
        </Content> 
      </View>
    );
                  }
  }
}

var styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F4F7ED',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch',
  },
  LoginButtonStyle: {
 
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:15,
    marginRight:15,
    backgroundColor:'#FBF2D5',
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#FBF2D5',
    textAlign: 'center',
  },

  OutlineButton: {
 
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:15,
    marginRight:15,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#FBF2D5',
    textAlign: 'center',
  },

  text: {
    color: 'black',
    fontFamily: 'Arvo'
  },

  textButton: {
    color: '#FBF2D5',
    fontFamily: 'Arvo',
    textAlign: 'center',
  },

  textButtonBlack: {
    fontFamily: 'Arvo',
    textAlign: 'center',
  },

  logo:{
    width: '100%',
    height: '100%',
    resizeMode: 'contain' 
  },

  textPrice: {
    fontFamily: 'Arvo',
    color: '#FDC57B',
    fontSize: 16
  },
  textTitle: {
    fontFamily: 'Arvo',
    color: '#394a51',
    fontSize: 14
  },
 
  textBody: {
    fontFamily: 'Arvo',
    color: '#FBF2D5'
  },
  textAddress: {
    fontFamily: 'Arvo',
    color: '#fcc882',
    fontSize: 14
  },
  textShopName :{
    fontFamily: 'Arvo',
    color: '#8fb4a7',
    fontSize: 18
  },
  link:{
    fontFamily: 'Arvo',
    textAlign: 'center',
    color:'#7fa99b'
  },
  cardStyle:{
    backgroundColor: '#F4F7ED'
  },
  searchContainer: {
    width: 250,
    backgroundColor:'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  searchInputContainer: {
    backgroundColor: '#bdd2c6'
  }

});
