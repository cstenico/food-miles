import React, { Component } from 'react';
import { Image } from 'react-native';
import { Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base';

export default class FoodCard extends Component {
  render() {
    return (
      <Card style={{flex: 0}}>
        <CardItem>
          <Left>
            <Text>{this.props.item.name}</Text>
          </Left>
        </CardItem>
        <CardItem>
          <Left>
            <Thumbnail source={{uri: this.props.shop.image}} />
            <Body>
              <Text>{this.props.shop.name}</Text>
              <Text note>{this.props.shop.address}</Text>
            </Body>
          </Left>
          <Right>
            <Text>{this.props.item.price}</Text>
          </Right>
        </CardItem>
        <CardItem>
          <Body>
            <Image source={{uri: this.props.item.image}} style={{height: 200, width: 200, flex: 1}}/>
            <Text>
              {this.props.item.description}
            </Text>
          </Body>
        </CardItem>
        <CardItem>
          <Left>
            <Button textStyle={{color: '#87838B'}}>
              <Text>Chat</Text>
            </Button>
          </Left>
        </CardItem>
      </Card>
    )
  }
}
