import React from 'react';
import { Text, Content, H1, Thumbnail, Item, Input, Label, Left} from 'native-base';
import {View, Image, ImageBackground, StyleSheet, TouchableOpacity, Button, FormLabel, FormInput, FormValidationMessage} from 'react-native';
import { Formik} from 'formik';
import { SearchBar, ThemeProvider } from 'react-native-elements';
import SearchResults from '../components/SearchResults'


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
		}
  }

  updateSearch = search => {
    this.setState({ search });
    this.getSearch();
  };

  getSearch(){
    if(this.state.search.length < 3){
      this.setState({results_screen: false})
    }else{    
      fetch('http://192.168.15.10:5000/search?search=' + this.state.search)
      .then((data) => {
        return data.json();
      }).then((response) => {
        this.setState({search_results: response, results_screen: true})
      });
    }
  }


  render() {
    const { navigation } = this.props;
    const username = navigation.getParam('name', 'Usuário');
    const useremail = navigation.getParam('email', 'example@gmail.com');

    if(this.state.results_screen){
      return (
        <View style={ styles.container }>
          <Content contentContainerStyle ={{paddingTop: 50, paddingHorizontal: 10}}>
            <Image
              source={ require('../assets/images/pretzel-smallpp.png')}
              style = {[{marginLeft: 5}]}
            />
            <H1 style={[styles.text,{position: "absolute", top: 60, left: 80, fontSize: 15, color: '#56666a'}]}>Ola, {username}</H1>
            <Image
              source={ require('../assets/images/profilepic.png')}
              style = {styles.userIcon}
            /> 
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
          <Content contentContainerStyle ={{paddingTop: 50, paddingHorizontal: 10}}>
            <Image
              source={ require('../assets/images/pretzel-smallpp.png')}
              style = {[{marginLeft: 5}]}
            />
            <H1 style={[styles.text,{position: "absolute", top: 60, left: 80, fontSize: 15, color: '#56666a'}]}>Ola, {username}</H1>
            <Image
              source={ require('../assets/images/profilepic.png')}
              style = {styles.userIcon}
            /> 
  
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
  }
});
