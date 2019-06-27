import React from 'react';
import { Input, Item, Right, Thumbnail, Body, ListItem, StyleProvider, Container, Header, Content, Card, CardItem, Icon, Left} from 'native-base';
import {View, ScrollView,  Image, ImageBackground, StyleSheet, TouchableOpacity, Button, FormLabel, FormInput, FormValidationMessage, Text, ActivityIndicator} from 'react-native';
import { Formik} from 'formik';
import { SearchBar, ThemeProvider } from 'react-native-elements';
import SearchResults from '../components/SearchResults'
import CarouselScreen from './CarouselScreen'
import axios from 'axios'
import ShopScreen from './ShopScreen'

export default class FeedScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
		super(props);

		this.state = {
      search: '',
      search_results: '',
      results_screen: false,
      email: this.props.navigation.getParam('email', ''),
      name: this.props.navigation.getParam('name', ''),
      address: this.props.navigation.getParam('address', ''),
      phone: this.props.navigation.getParam('phone', ''),
      stores: {},
      loading: true
		}
  }

  getData(){
      fetch('https://food-miles-dev-filao.herokuapp.com/stores')
        .then(response => response.data)
        .then((response) =>  {
          this.setState({...this.state, loading: false, stores: response});
        })
        .catch((error) => {
          console.error(error);
        })
  }

  updateSearch = search => {
    this.setState({ search });
    if(this.state.search.length <= 3){
      this.setState({results_screen: false})
    }else{    
      fetch('https://food-miles-dev-filao.herokuapp.com/search?search=' + this.state.search)
      .then((data) => {
        return data.json();
      }).then((response) => {
        this.setState({search_results: response, results_screen: true})
      });
    }
  };

  componentDidMount(){
    this.getData();
  }
  render() {

    if(this.state.results_screen){
      return (
        <View style={ styles.container }>
          <Content contentContainerStyle ={{paddingTop: 10,paddingHorizontal: 10}}>
            <View style={styles.v5}>
              <Text> </Text>
            </View>
            <ListItem transparent avatar>
              <Left>
                  <Thumbnail source={{ uri: 'https://i.imgur.com/WJOAW4E.png' }} />
              </Left>
              <Body>
                  <Text> </Text>
                  <Text note> </Text>
              </Body>
              <Right>
                  <Thumbnail source={{ uri: 'https://i.imgur.com/vlNOtMM.png' }} />
              </Right>
            </ListItem>
            <SearchBar
              round
              searchIcon={{ size: 24 }}
              placeholder="Buscar produtos e lojinhas"
              containerStyle={styles.searchContainer}
              inputStyle={[styles.text,{fontSize: 12}]}
              inputContainerStyle={styles.searchInputContainer}
              onChangeText={this.updateSearch}
              value={this.state.search}
            />
            <Content>
                <SearchResults results={this.state.search_results} />
            </Content>
          </Content>
        </View>
      );
    }else{
      return (
        <View style={ styles.container }>
          <ActivityIndicator size="large" animating={this.state.loading} />

          <Content contentContainerStyle ={{paddingTop: 10, paddingHorizontal: 10}}>
            <View style={styles.v5}>
              <Text> </Text>
            </View>
            <ListItem transparent avatar>
              <Left>
                  <Thumbnail source={{ uri: 'https://i.imgur.com/WJOAW4E.png' }} />
              </Left>
              <Body>
                  <Text> </Text>
                  <Text note> </Text>
              </Body>
              <Right>
                  <Thumbnail source={{ uri: 'https://i.imgur.com/vlNOtMM.png' }} />
              </Right>
            </ListItem>
  
            <SearchBar
              round
              searchIcon={{ size: 24 }}
              placeholder="Buscar produtos e lojinhas"
              containerStyle={styles.searchContainer}
              inputStyle={[styles.text,{fontSize: 12}]}
              inputContainerStyle={styles.searchInputContainer}
              onChangeText={this.updateSearch}
              value={this.state.search}
            />

          </Content>
          <CarouselScreen />
          {Object.keys(this.state.stores).map(product => (
              <ProductCard key={this.state.stores[product]} seller_name={this.state.stores[product][0].seller_name} seller_picture={this.state.stores[product][0].seller_url} >
              </ProductCard>
          ))}
        </View>
      );
    }
  }
}

var styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#F4F7ED'
  },
  submitButton:{
    backgroundColor: '#7fa99b',
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:15,
    marginRight:15,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#7fa99b'
  },
  textButton: {
    fontFamily: 'Arvo',
    textAlign: 'center',
    color: '#FBF2D5'
  },
  link:{
    fontFamily: 'Arvo',
    textAlign: 'center',
    color:'#7fa99b'
  }, 
  logo: {
    width:'60%',
    height: '60%'
  },
  userIcon: {
    position: "absolute",
    top: 60,
    right: 20,
    flex: 1,
    width: 40, 
    height: 40, 
    resizeMode: 'contain'  
  },
  searchContainer: {
    position: "relative",
    right: 10,
    width: 360,
    backgroundColor:'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0
  },
  searchInputContainer: {
    backgroundColor: '#bdd2c6'
  },
v1: {
    height: 80,
    width: 80,
    backgroundColor: '#F4F7ED',
},
v2: {
    flex: 1,
    color: '#7FA99B',
    justifyContent: 'center',
    alignItems: 'center',
},
v4: {
    height: 44,
    width: 385,
    backgroundColor: '#7FA99B',
    borderRadius: 30,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
},
v5: {
    color: '#7FA99B',
},
v6: {
    height: 120,
    width: 120,
    borderColor: '#FFD54D',
    borderRadius: 90,
    margin: 30,
    borderWidth: 4,
},
v7: {
    height: 80,
    width: 80,
},
MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },

  GooglePlusStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc4e41',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 220,
    borderRadius: 5,
    margin: 5,
  },

  FacebookStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#485a96',
    borderWidth: 0.5,
    borderColor: '#fff',
    height: 40,
    width: 220,
    borderRadius: 5,
    margin: 5,
  },

  ImageIconStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
  },

  TextStyle: {
    color: '#fff',
    marginBottom: 4,
    marginRight: 20,
  },

  SeparatorLine: {
    backgroundColor: '#fff',
    width: 1,
    height: 40,
  },
});
