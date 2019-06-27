import React, { Component } from 'react';
import { View, Image, ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base';

export default class FoodCard extends Component {
  constructor(props) {
		super(props);

  }

  render() {

    return (
      <Card transparent style={{ card: { backgroundColor: '#7FA99B' }}}>
        <CardItem style={{ card: { backgroundColor: '#7FA99B' }}}>
          <Left>
            <Text style={styles.textTitle}>{this.props.item.name}</Text>
          </Left>
        </CardItem>
        <CardItem style={{ card: { backgroundColor: '#7FA99B' }}}>
          <Left>
            <Thumbnail source={{uri: this.props.shop.image}} />
            <Body>
              <Text style={styles.textShopName} onPress={() => this.props.navigation.navigate('Justus')}>{this.props.shop.name}</Text>
              <Text style={styles.textAddress}>{this.props.shop.address}</Text>
            </Body>
          </Left>
          <Right>
            <Button style={styles.priceButton}>
              <Text style={styles.textPrice}>{this.props.item.price}</Text>
            </Button>
          </Right>
        </CardItem >
        <CardItem style={{ card: { backgroundColor: '#7FA99B' }}}>
          <Body>
            <Right>
            <Image
              source={{uri: this.props.item.picture_url}}
              style={styles.image}/>
            </Right>
            <Text style={styles.textBody}>
              {this.props.item.description}
            </Text>
          </Body>
        </CardItem>
        <CardItem style={{ card: { backgroundColor: '#7FA99B' }}}>
            <Button style={styles.chatButton}>
              <Text style={styles.textButton}>Contato</Text>
            </Button>
        </CardItem>
      </Card>
    )
  }
}

var styles = StyleSheet.create({
  card:{
    backgroundColor: '#7FA99B',
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#FBF2D5'
  },
  chatButton:{
    backgroundColor: '#FBF2D5',
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:15,
    marginRight:15,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#FBF2D5'
  },
  priceButton:{
    backgroundColor: '#394A51',
    marginTop:10,
    paddingTop:15,
    paddingBottom:15,
    marginLeft:25,
    marginRight:25,
    borderRadius:10,
    borderWidth: 1,
    borderColor: '#394A51'
  },
  textPrice: {
    fontFamily: 'Arvo',
    color: '#FDC57B',
    fontSize: 16
  },
  textTitle: {
    fontFamily: 'Arvo',
    color: '#FBF2D5',
    fontSize: 24
  },
  textButton: {
    fontFamily: 'Arvo',
    textAlign: 'center',
    color: '#394A51'
  },
  textBody: {
    fontFamily: 'Arvo',
    color: '#FBF2D5'
  },
  textAddress: {
    fontFamily: 'Arvo',
    color: '#394A51',
    fontSize: 14
  },
  textShopName :{
    fontFamily: 'Arvo',
    color: '#394A51',
    fontSize: 18
  },
  link:{
    fontFamily: 'Arvo',
    textAlign: 'center',
    color:'#7fa99b'
  },
  image: {
    height: 200,
    width: 200,
    flex: 1
  }
});
