import React from 'react';
import { Text, Content, Item, Input, Label} from 'native-base';
import {ActivityIndicator,Share,Clipboard,View, Image, ScrollView, StyleSheet, TouchableOpacity, Button,  KeyboardAvoidingView} from 'react-native';
import { Formik} from 'formik';
import axios from 'axios';
import { ImagePicker, Permissions } from 'expo';
import {AsyncStorage} from 'react-native';



export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  state = {
    image: null,
    uploading: false,
    uri : '',
    response: ''
  };

  _storeData = async (value) => {
    try {
      await AsyncStorage.removeItem('email');
      await AsyncStorage.setItem('email', value);
    } catch (error) {
      // Error saving data
    }
  };

  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}>
          <ActivityIndicator color="#fff" size="large" />
        </View>
      );
    }
  };

  _maybeRenderImage = () => {
    let {
      image
    } = this.state;

    if (!image) {
      return;
    }

    return (
      <View
        style={styles.maybeRenderContainer}>
        <View
          style={styles.maybeRenderImageContainer}>
          <Image source={{ uri: image }} style={styles.maybeRenderImage} />
        </View>

        <Text
          onPress={this._copyToClipboard}
          onLongPress={this._share}
          style={styles.maybeRenderImageText}>
          {image}
        </Text>
      </View>
    );
  };

  _share = () => {
    Share.share({
      message: this.state.image,
      title: 'Check out this photo',
      url: this.state.image,
    });
  };

  _copyToClipboard = () => {
    Clipboard.setString(this.state.image);
    alert('Copied image URL to clipboard');
  };

  _takePhoto = async () => {
    const {
      status: cameraPerm
    } = await Permissions.askAsync(Permissions.CAMERA);

    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === 'granted' && cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _pickImage = async () => {
    const {
      status: cameraRollPerm
    } = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // only if user allows permission to camera roll
    if (cameraRollPerm === 'granted') {
      let pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
      });

      this._handleImagePicked(pickerResult);
    }
  };

  _handleImagePicked = async pickerResult => {
    let uploadResponse, uploadResult;

    //try {
      this.setState({
        uploading: true,
        //uri: pickerResult.uri
      });

      if (!pickerResult.cancelled) {
        //uploadResponse = await uploadImageAsync(pickerResult.uri);
        //uploadResult = await uploadResponse.json();

        this.setState({
          uri: pickerResult.uri
        });
        console.log('URI');
        console.log(this.state.uri);
      }
    /*} catch (e) {
      console.log({ uploadResponse });
      console.log({ uploadResult });
      console.log({ e });
      alert('Upload failed, sorry :(');
    } finally {
      this.setState({
        uploading: false
      });
    }*/
  };

  postSignUp = async (params) => {
    let uri = this.state.uri
    let uriParts = this.state.uri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    let formData = new FormData();
    formData.append('user_image', {
      uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });
    formData.append('name', params.name);
    formData.append('cpf', params.cpf);
    formData.append('email', params.email);
    formData.append('telephone', params.phone);
    formData.append('password', params.password);
    formData.append('address', params.address);


    await fetch('https://food-miles-dev-filao.herokuapp.com/signup', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    })

    const res = await fetch('https://food-miles-dev-filao.herokuapp.com/signup_db', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData
    }) 
    console.log("POST RESPONSE: ", JSON.stringify(res));

    const response = res.json()
    this.setState({...this.state, loading: false, response: res});
    console.log("ff");

    console.log(res.status);
    if (res.status == 200){
      this._storeData(params.email)
      this.props.navigation.navigate('Main')
    }else{
      console.log('Barrado')
    }

  }

  render() {
    let {
      image
    } = this.state;
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
                /*this._storeData(values.email)
                this.props.navigation.navigate('Main', {
                  email: values.email,
                  name: values.name,
                  address: values.address,
                  phone: values.phone
                });*/
                this.postSignUp(values)

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
                  <View style={styles.container}>

                    <Button
                    style={styles.OutlineButton}
                      onPress={this._pickImage}
                      title="Escolher Imagem"
                    />

                    <Button style={styles.OutlineButton} onPress={this._takePhoto} title="Tirar foto" />

                    {this._maybeRenderImage()}
                    {this._maybeRenderUploadingOverlay()}
                  </View>
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
});
