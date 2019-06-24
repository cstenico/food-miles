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
import { Input, Item, Button, Right, Thumbnail, Body, ListItem, StyleProvider, Container, Header, Content, Card, CardItem, Icon, Left} from 'native-base';
import axios from 'axios';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';

const PD = ({product}) => (

    <View>
        <Card style={styles.v6}>
            <CardItem style={styles.v7}>
                <Left>
                    <Thumbnail source={{uri: product.seller_picture}} />
                    <Body>
                        <Text>{product.seller_name}</Text>
                        <Text note>{product.description}</Text>
                    </Body>
                </Left>
            </CardItem>
            <CardItem cardBody style={styles.v7}>
                <Thumbnail source={{uri: product.picture_url}} style={{width: 419, height: 260, borderRadius: null}}/>
            </CardItem>
            <CardItem style={styles.v7}>
                <Left>
                    <Button transparent>
                          <Icon active name="thumbs-up" />
                          <Text>12 Likes</Text>
                    </Button>
                </Left>
                <Body>
                    <Right>
                        <Button transparent>
                            <Icon active name="chatbubbles" />
                            <Text>4 Comments</Text>
                        </Button>
                    </Right>
                </Body>
            </CardItem>
        </Card>
    </View>
)

export default PD;

//ESTILOS PARA CADA UM DOS COMPONENTES
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F7ED',
    },
    v1: {
        height: 80,
        width: 80,
        backgroundColor: '#F4F7ED',
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
    },
    v6: {
        height: 419,
        width: 419,
        backgroundColor: '#7FA99B',
        borderRadius: 30,
    },
    v7: {
        borderRadius: 30,
        backgroundColor: '#7FA99B',
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