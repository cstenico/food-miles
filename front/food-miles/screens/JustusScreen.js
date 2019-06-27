import React from 'react';
import { Text, Content, H1, Thumbnail, Left, Right, Body, Card, CardItem} from 'native-base';
import {View, Image,  ImageBackground, StyleSheet, TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Button,SearchBar,ThemeProvider } from 'react-native-elements';
import FoodCard from './../components/FoodCard'


export default class JustusScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={ styles.container }>
        <Content contentContainerStyle ={{paddingTop: 50, paddingHorizontal: 10}}>
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
                <SearchBar
                  round
                  searchIcon={{ size: 24 }}
                  placeholder="Buscar produtos"
                  containerStyle={styles.searchContainer}
                  inputStyle={[styles.text,{fontSize: 12}]}
                  inputContainerStyle={styles.searchInputContainer}
                />
                </Right>
              </CardItem> 
              <CardItem style={styles.cardStyle}>
                <Left>
                  <Thumbnail source={require('../assets/images/profilepic.png')} />
                  <Body>
                    <Text style={styles.textShopName}>Exemplo</Text>
                    <Text style={styles.textAddress}>Sao Carlos, SP</Text>
                    <Text style={styles.text}> Justus, vendo produtos feitos em minha horta. Entrego praca XV e regiao. Vamos entrar em contato!</Text>
                  </Body>
                </Left>
              </CardItem>
            </Card>
            <FoodCard item={{name: 'Laranja', price: 10, picture_url: "https://img.estadao.com.br/thumbs/640/resources/jpg/9/8/1527684459989.jpg", description: "Laranja muito boa"}} shop={{name: 'Justus', address: 'São Carlos', image: "https://pbs.twimg.com/profile_images/1035371242881265664/jwbIlX-2.jpg", }} />
            <FoodCard item={{name: 'Maçã', price: 10, picture_url: "https://img.itdg.com.br/tdg/images/blog/uploads/2017/05/shutterstock_290834552.jpg", description: "Maçã deliciosa"}} shop={{name: 'Justus', address: 'São Carlos', image: "https://pbs.twimg.com/profile_images/1035371242881265664/jwbIlX-2.jpg", }} />

        </Content> 
      </View>
    );
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
