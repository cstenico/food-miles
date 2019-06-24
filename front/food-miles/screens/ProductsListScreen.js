import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { Input, Item, Button, Right, H1, Thumbnail, Body, ListItem, StyleProvider, Container, Header, Content, Card, CardItem, Icon, Left} from 'native-base';
import axios from 'axios';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import ProductCard from '../components/ProductCard'; 

export default class ProductsListScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            category: '',
            products_list: '',
            seller_name: '',
            seller_picture: '',
            picture_url: '',
        }
    }

    onLogin = () => {

        console.log("email: " + String(this.state.email) + " password: " + String(this.state.password));

        axios.post('https://food-miles.herokuapp.com/login', {
            login: this.state.login, 
            senha: this.state.senha,
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    onVeg = () => {

        axios.get('https://food-miles.herokuapp.com/categories', {
            category: this.state.category, 
        })
        .then(response => response.data)
        .then((response) =>  {
            console.log(response);
            this.setState({...this.state, products_list: response});
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    getData(){
        this.onVeg();
    }

    componentDidMount(){
        this.getData();
    }

    render() {
        return (
            <View style={styles.container}>

                {this.state.data}

                <Header transparent>
                    <Left>
                        <Button transparent onPress = {() => this.props.navigation.goBack()}>
                            <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Text>{JSON.stringify([this.state.category])}</Text>
                    </Body>
                    <Right>
                        <Image source={{uri: 'https://i.imgur.com/WJOAW4E.png'}} style={{height: 60, width: 60}}/>
                    </Right>
                </Header>

                <Header transparent searchBar rounded>
                    <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Buscar produtos e lojinhas" />
                    </Item>
                    <Button transparent>
                    </Button>
                </Header>

                <ScrollView vertical>
                    {Object.keys(this.state.products_list).map((category) => {
                        return Object.keys(this.state.products_list[category]).map((product) => {
                            return (
                                <ProductCard product={(this.state.products_list[category][product])}>
                                </ProductCard>)
                        })       
                    })}
                </ScrollView>

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
        color: '#7FA99B',
        //fontFamily: 'Arvo',
    },
    v2: {
        justifyContent: "space-between",
    },
    v8:{
        height: 80,
        width: 419,
    },
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
      },
});
