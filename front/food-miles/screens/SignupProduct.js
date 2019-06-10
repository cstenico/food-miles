import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Input, Item, Button, StyleProvider, Container, Header, Content, Card, CardItem, Icon, Left} from 'native-base';
import axios from 'axios';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

export default class SignupProduct extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            user_id: '',
            user_email: '',
            product_name: '',
            product_price: '',
            product_description: '',
            product_category: '',
        }
    }

    onLogin = () => {

        console.log("name: " + String(this.state.name) + "cpf: " + String(this.state.cpf) + "email: " + String(this.state.email) + " password: " + String(this.state.password));

        axios.post('https://food-miles.herokuapp.com/products', {
            user_id: this.state.user_id,
            user_email: this.state.user_email, 
            product_name: this.state.product_name, 
            product_price: this.state.product_price,
            product_description: this.state.product_description,
            product_category: this.state.product_category,
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            //OS COMPONENTES DA TELA TEM QUE SER CRIADO AQUI DENTRO
            <View style={styles.container}>

                <View style={styles.v5}>
                    <Text> </Text>
                    <Text> </Text>
                </View>

                <View style={styles.v1}>
                    <Image source={{uri: 'https://i.imgur.com/e54hYDo.png'}} style={{height: 200, width: 200}}/>
                </View>    

                <View style={{ padding: 20, justifyContent: 'center', alignItems: 'center'}}>
                    <Item>
                        <Input
                            onChangeText={(value) => { this.setState({ user_id: value }) }}
                            placeholder='Identificação do Usuario' />
                    </Item>
                    <Item>
                        <Input
                            onChangeText={(value) => { this.setState({ user_email: value }) }}
                            placeholder='Email' />
                    </Item>
                    <Item>
                        <Input
                            onChangeText={(value) => { this.setState({ product_name: value }) }}
                            placeholder='Nome do Produto' />
                    </Item>
                    <Item>
                        <Input
                            onChangeText={(value) => { this.setState({ product_price: value }) }}
                            placeholder='Preço' />
                    </Item>
                    <Item>
                        <Input
                            onChangeText={(value) => { this.setState({ product_description: value }) }}
                            placeholder='Descriçao do Produto' />
                    </Item>
                    <Item>
                        <Input
                            onChangeText={(value) => { this.setState({ product_category: value }) }}
                            placeholder='Categoria' />
                    </Item>
                </View>

                <View style={styles.v4}> 
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Button transparent style={{ padding: null }} 
                            onPress={() => {this.onLogin();}}>
                            <Text>CADASTRAR PRODUTO</Text>
                        </Button>
                    </View>
                </View>

                <Text style={{ fontSize: 50 }}>  {this.state.nome}  </Text>

            </View>
        );
    }
}

//ESTILOS PARA CADA UM DOS COMPONENTES
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F7ED',
    },
    v1: {
        height: 100,
        width: 200,
        backgroundColor: '#F4F7ED',
        justifyContent: 'center',
        padding: 110,
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
    }
});