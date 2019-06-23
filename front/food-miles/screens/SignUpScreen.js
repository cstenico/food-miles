import React from 'react';
import { Text, Content, H1, Thumbnail, Item, Input, Label, Left} from 'native-base';
import {ActivityIndicator,StatusBar,Share,Clipboard,View, Image, ImageBackground,ScrollView, StyleSheet, TouchableOpacity, Button, FormLabel, FormInput, FormValidationMessage, KeyboardAvoidingView} from 'react-native';
import { Formik} from 'formik';
import { Constants, ImagePicker, Permissions } from 'expo';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    image: null,
    uploading: false,
    uri : '',
  };

  postSignUp(params){

    let formData = new FormData();
    formData.append('name', params.name);
    formData.append('cpf', params.cpf);
    formData.append('email', params.email);
    formData.append('telephone', params.phone);
    formData.append('password', params.password);
    formData.append('address', params.address);

    fetch('https://food-miles-dev-filao.herokuapp.com/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    })
    .then((data) => {
      return data;
    })
  }

  render() {

    return (
    <ScrollView>
      <KeyboardAvoidingView behavior='padding'>
        <Content contentContainerStyle ={{paddingTop: 50, paddingHorizontal: 10}}>
          <Content contentContainerStyle ={{ paddingHorizontal: 10, alignItems:'center', justifyContent: "center"}}>
            <Image 
              source={ require('../assets/images/pretzel-smallpp.png')}
              style={styles.logo}
            />
          </Content>
          <Content contentContainerStyle ={{paddingTop: 10, paddingHorizontal: 10}}>
            <Formik
              initialValues={{ email: '', password: '', cpf: '', name: '', phone: '', address: '' }}
              onSubmit={(values, props) => {
                this.postSignUp(values).then( response => {

                  if (response){
                    this.props.navigation.navigate('Main', {
                      email: values.email,
                      name: values.name,
                    });
                  }else{
                    Alert.alert(
                      'Alert Title',
                      'My Alert Msg',
                      [
                        {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel',},
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                      ],
                      {cancelable: false},
                    );
                  }
                });
              }}
            >
              {props => (
                <Content contentContainerStyle ={{paddingHorizontal: 10}}  keyboardShouldPersistTaps={'always'}>
                  <Item stackedLabel>
                    <Label>Nome</Label>
                    <Input
                      onChangeText={props.handleChange('name')}
                      onBlur={props.handleBlur('name')}
                      value={props.values.name}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>CPF</Label>
                    <Input
                      onChangeText={props.handleChange('cpf')}
                      onBlur={props.handleBlur('cpf')}
                      value={props.values.cpf}
                      keyboardType={'numeric'}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>Telefone</Label>
                    <Input
                      onChangeText={props.handleChange('phone')}
                      onBlur={props.handleBlur('phone')}
                      value={props.values.phone}
                      keyboardType={'numeric'}
                    />
                  </Item>
                  <Item stackedLabel>
                    <Label>Endereço</Label>
                    <Input
                      onChangeText={props.handleChange('address')}
                      onBlur={props.handleBlur('address')}
                      value={props.values.address}
                    />
                  </Item>
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
                    <TouchableOpacity
                      style={styles.submitButton}
                      onPress={props.handleSubmit}
                    >
                      <Text style={styles.textButton}>CRIAR CONTA</Text>
                    </TouchableOpacity>
                </Content>
              )}
            </Formik>
          </Content>
        </Content>
      </KeyboardAvoidingView>
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
    alignContent: 'center',
  },
  exampleText: {
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    textAlign: 'center',
  },
  maybeRenderUploading: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
  },
  maybeRenderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: 'rgba(0,0,0,1)',
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    width: 250,
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: 'hidden',
  },
  maybeRenderImage: {
    height: 250,
    width: 250,
  },
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  }
});
