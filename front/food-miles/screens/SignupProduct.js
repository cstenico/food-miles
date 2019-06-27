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
import { Input, Item, Button, StyleProvider, Container, Header, Form, Picker, Content, Card, CardItem, Icon, Left} from 'native-base';
import axios from 'axios';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

export default class SignupProduct extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            product_name: '',
            product_price: '',
            product_description: '',
            product_category: '',
            selected: undefined,
        }
    }

    onSignup = () => {

        return(axios.post('https://food-miles.herokuapp.com/products', {
            product_name: this.state.product_name, 
            product_price: this.state.product_price,
            product_description: this.state.product_description,
            product_description: this.state.product_category,
        }))
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    onValueChange(value: string) {

        this.setState({
            selected: value
        });
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.v5}>
                    <Text> </Text>
                    <Text> </Text>
                </View>

                <View style={styles.v1}>
                    <Image source={{uri: 'https://i.imgur.com/e54hYDo.png'}} style={{height: 200, width: 200}}/>
                </View>    

                <View style={{margin: 20}}>
                    <Item style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Input
                            onChangeText={(value) => { this.setState({ product_name: value }) }}
                            placeholder='Nome do Produto' />
                    </Item>
                    <Item style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Input
                            onChangeText={(value) => { this.setState({ product_price: value }) }}
                            placeholder='Preço' />
                    </Item>
                    <Item style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Input
                            onChangeText={(value) => { this.setState({ product_description: value }) }}
                            placeholder='Descriçao do Produto' />
                    </Item>
                    <Form>
                        <Item picker>
                          <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: 151 }}
                            placeholder="Selecione a categoria do seu produto"
                            placeholderStyle={{ color: "#7FA99B" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.selected}
                            onValueChange={this.onValueChange.bind(this)}
                          >
                            <Picker.Item label="Vegetais" value="Vegetais" />
                            <Picker.Item label="Frutas" value="Frutas" />
                            <Picker.Item label="Salgados" value="Salgados" />
                            <Picker.Item label="Doces" value="Doces" />
                            <Picker.Item label="Feito em Casa" value="Feito em Casa" />
                          </Picker>
                        </Item>
                    </Form>
                </View>

                <View style={styles.v4}> 
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Button transparent style={{ padding: null }} 
                            onPress={() => {
                                this.onSignup().then(() => this.props.navigation.navigate('Carousel'));
                            }}>
                            <Text>CADASTRAR</Text>
                        </Button>
                    </View>
                </View>

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