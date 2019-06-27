import React from 'react';
import { Text, Content, Item, Input, Label, Left} from 'native-base';
import { Image, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView} from 'react-native';
import { Formik} from 'formik';
import {AsyncStorage} from 'react-native';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  postLogin = async (params) => {
    
    let formData = new FormData();

    formData.append('email', params.email);
    formData.append('password', params.password);

    
    const res = await fetch('https://food-miles-dev-filao.herokuapp.com/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    })

    
    console.log("POST RESPONSE: ", JSON.stringify(res));

    this.setState({...this.state, loading: false, response: res});

    console.log(res.status);
    if (res.status == 200){
      this._storeData(params.email)
      this.props.navigation.navigate('Main')
    }else{
      console.log('Barrado')
    }

  }

  _storeData = async (value) => {
    try {
      await AsyncStorage.removeItem('email');
      await AsyncStorage.setItem('email', value);
    } catch (error) {
      // Error saving data
    }
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
                  this.postLogin(values)
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
