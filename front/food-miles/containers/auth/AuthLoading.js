import React from 'react';
import {AsyncStorage} from 'react-native';
import { Container, Content, Spinner } from 'native-base';


export default class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this._fetchToken();
  }
  _fetchToken = async () => {
    //const userToken = await AsyncStorage.getItem('jwt');
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <Container>
        <Content>
          <Spinner color='blue' />
        </Content>
      </Container>
    );
  }
}
