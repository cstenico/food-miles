import React from 'react';
import { Text, Content, H1, Thumbnail, Left} from 'native-base';
import {View, Image,  ImageBackground, StyleSheet, TouchableOpacity, Button} from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={ styles.container }>
          <ImageBackground source={require('../assets/images/background-dark.png')} style={styles.backgroundImage}>
            <Content contentContainerStyle ={{paddingTop: 50, marginLeft: 20}}>
                <Image
                  source={ require('../assets/images/LOGOVERDECLARO.png')}
                  style={styles.logo}
                />
                <Content contentContainerStyle ={{paddingTop: 100, paddingHorizontal: 50, paddingVertical:50}}>
                  <H1 style={styles.text}>Comida caseira.</H1>
                  <H1 style={styles.text}>Feita com muito amor, carinho e sustentabilidade</H1>
                </Content>
                <Content contentContainerStyle ={{paddingTop: 60,paddingVertical:50}}>
                  <TouchableOpacity
                      style={styles.LoginButtonStyle}
                      activeOpacity = { .5 }
                      onPress={() => this.props.navigation.navigate("SignUp")}
                  >
                        <Text style={styles.textButtonBlack}> Crie sua conta! </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                      outline
                      style={styles.OutlineButton}
                      onPress={() => this.props.navigation.navigate("Login")}
                  >
                    <Text style={styles.textButton}> Já possui conta? Entre aqui!</Text>
                  </TouchableOpacity>
                </Content>
            </Content>
          </ImageBackground>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
      flex: 1,
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
    color: '#FBF2D5',
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
    width: '20%',
    height: '20%'
  }

});
