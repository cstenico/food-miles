import React, { Component } from 'react';
import { View, Image, ImageBackground, StyleSheet, TouchableOpacity} from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Right, Body } from 'native-base';
import SearchCards from './SearchCards'
import FoodCard from './FoodCard'

export default class SearchResults extends Component {

	constructor(props) {
		super(props);
  }

  mountCategories() {
    var categories = this.props.results[0];
    var categoriesList = '';
    for (let i = 0; i < categories.length; i++){
      categoriesList.concat(<SearchCards item={categories[i]} />)
    }
    return categoriesList;
  }

  mountProducts(){
    var products = this.props.results[1];
    var productsList = '';
    for (let i = 0; i < products.length; i++){
      productsList.concat(<SearchCards item={products[i]} />)
    }
    return productsList;
  }

  render() {
    console.log(this.props.results)
    return (
      <Content>
				<Card>
          {
            this.props.results[0].map(function(category, index){
              return <SearchCards item={category} index={index} />;
            })
          }
        </Card>
        <Card>
          {this.props.results[1].map(function(product, index){
            return <FoodCard item={product} shop={{name: product.name, address: '', image: product.seller_picture, }} index={index}/>;
          })}
        </Card>
			</Content>
    )
  }
}

var styles = StyleSheet.create({
 
});
