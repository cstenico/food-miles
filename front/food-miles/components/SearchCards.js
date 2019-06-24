import React, { Component } from 'react';
import { View, Image, ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base';

export default class SearchCards extends Component {

	constructor(props) {
		super(props);
  }

  

  render() {
    return (
      <CardItem header button onPress={() => alert("This is Card Header")}>
				<Text>{this.props.item}</Text>
			</CardItem>
    )
  }
}

var styles = StyleSheet.create({
 
});
