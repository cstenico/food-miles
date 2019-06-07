import React from 'react';
import { Text, Content, H1, Thumbnail, Item, Input, Label, Left} from 'native-base';
import {View, Image, ImageBackground, StyleSheet, TouchableOpacity, Button, FormLabel, FormInput, FormValidationMessage, KeyboardAvoidingView} from 'react-native';
import { Formik} from 'formik';
import {signUp} from '../containers/auth/Authentication';


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <KeyboardAvoidingView style={ styles.container }>
        <Content contentContainerStyle ={{paddingTop: 50, paddingHorizontal: 10}}>
          <Content contentContainerStyle ={{ paddingHorizontal: 10, alignItems:'center', justifyContent: "center"}}>
              <Image 
                source={ require('../assets/images/pretzel-smallpp.png')}
                style={styles.logo}
              />
          </Content>
            <Content contentContainerStyle ={{paddingTop: 10, paddingHorizontal: 10}}>
            <Formik
                initialValues={{ email: '', password: '', cpf: '', name: '', phone: '' }}
                onSubmit={(values, props) => {
                  signUp(values).then((response) => {
                    if(response){
                      this.props.navigation.navigate('Main');
                    }else{
                      alert("Erro no cadastro");
                    }
                  }).catch((error)=>{
                    throw new Error(error);
                  });
                }}
              >
                {props => (
                  <KeyboardAvoidingView contentContainerStyle ={{paddingHorizontal: 10}}>
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
                      />
                    </Item>
                    <Item stackedLabel>
                      <Label>Telefone</Label>
                      <Input
                        onChangeText={props.handleChange('phone')}
                        onBlur={props.handleBlur('phone')}
                        value={props.values.phone}
                      />
                    </Item>
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
                    paddingTop: 20}}>
                      <TouchableOpacity
                          style={styles.submitButton}
                          onPress={props.handleSubmit}
                      >
                        <Text style={styles.textButton}>CRIAR CONTA</Text>
                      </TouchableOpacity>
                    </Content>
                  </KeyboardAvoidingView>
                )}
              </Formik>
            </Content>
        </Content>
      </KeyboardAvoidingView>
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
  }
});
