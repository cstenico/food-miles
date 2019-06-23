import React from 'react';
import { Text, Content, H1, Thumbnail, Item, Input, Label, Left} from 'native-base';
import {View, Image, ImageBackground, StyleSheet, TouchableOpacity, Button, FormLabel, FormInput, FormValidationMessage, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Formik} from 'formik';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <ScrollView>
      <KeyboardAvoidingView  behavior='padding'>
        <Content contentContainerStyle ={{paddingTop: 50, paddingHorizontal: 10}}>
            <Left>
            <Image
              source={ require('../assets/images/logoooooo-small.png')}
            />
            </Left>
            <Content contentContainerStyle ={{paddingTop: 70, paddingHorizontal: 10}}>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values, props) => {
                    /*fetch('https://food-miles.herokuapp.com/login', {
                      method: 'POST',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        email: values.email,
                        password: values.password,
                      })
                      
                    }).then((data) => {
                      console.log("POST RESPONSE: " , JSON.stringify(data));
                      return data;
                    }).then( response => {
                      response.json();
                      if (response.status == 200){*/
                        this.props.navigation.navigate('Main', {
                          email: values.email,
                          name: 'User',
                        });
                      /*}else{
                        Alert.alert(
                          'Alert Title',
                          'My Alert Msg',
                          [
                            {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                            {
                              text: 'Cancel',
                              onPress: () => console.log('Cancel Pressed'),
                              style: 'cancel',
                            },
                            {text: 'OK', onPress: () => console.log('OK Pressed')},
                          ],
                          {cancelable: false},
                        );
                      }
                    });*/
                }}
              >
                {props => (
                  <Content contentContainerStyle ={{paddingHorizontal: 10}}>
                    <Item stackedLabel>
                      <Label>Email</Label>
                      <Input
                        onChangeText={props.handleChange('email')}
                        onBlur={props.handleBlur('email')}
                        value={props.values.email}
                        keyboardType={'email-address'}
                      />
                    </Item>
                    <Item stackedLabel last>
                      <Label>Senha</Label>
                      <Input
                        onChangeText={props.handleChange('password')}
                        onBlur={props.handleBlur('password')}
                        value={props.values.password}
                        secureTextEntry={true}
                      />
                    </Item>
                    <Content contentContainerStyle ={{
                    paddingTop: 60}}>
                      <Text style={styles.link}
                            onPress={() => LinkingIOS.openURL('http://google.com')}>
                        Esqueceu sua senha? Clique Aqui!
                      </Text>
                      <TouchableOpacity
                          style={styles.submitButton}
                          onPress={props.handleSubmit}
                      >
                        <Text style={styles.textButton}>ENTRAR</Text>
                      </TouchableOpacity>
                    </Content>
                  </Content>
                )}
              </Formik>
            </Content>
        </Content>
      </KeyboardAvoidingView >
      </ScrollView>

    );
  }
}

var styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FBF2D5'
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
  }
});
