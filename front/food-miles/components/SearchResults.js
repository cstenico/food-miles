import React, { Component } from 'react';
import { View, Image, ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base';

export default class SearchResults extends Component {

	constructor(props) {
		super(props);
  }
  render() {
    console.log(this.props.results)
    return (
      <Content>
				<Text>hero</Text>
			</Content>
    )
  }
}

var styles = StyleSheet.create({
 
});
