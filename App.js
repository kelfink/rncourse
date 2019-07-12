/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';

import PlacesList from './src/components/PlacesList/PlacesList'
import InputComponent from './src/components/InputComponent/InputComponent'
import ItemDetail from './src/components/ItemDetail/ItemDetail'

import image1 from './assets/pikachu.png'
import image2 from './assets/squirtle_sm.jpg'
import image3 from './assets/mudkip.png'
import image4 from './assets/ditto.jpg'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu. IT RELOADS ON IOS',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu' +
    'And it works reloading'
});


export default class App extends Component {
  state = {
    places: [{ key: String(Math.random()),
               name: 'Sacramento', 
               image: image1},
             { key: String(Math.random()), 
                name: 'Roseville',
                image: image2},
             { key: String(Math.random()),
                name: 'Chico',
                image: image3}
            ],
    selectedItem: null
  }

  itemSelectedHandler = (key) => {
    this.setState(prevState => {
      return { selectedItem: prevState.places.find(place => {
         return place.key === key
        })
      }
    });
  }

  placeAddedHandler = (placeName) => {
    if (placeName.trim() === "") {
      return;
    }

    this.setState(prevState => {
      return {
        places: prevState.places.concat(
          { key: String(Math.random()),
            name: placeName,
            image: { uri: 'https://assets.pokemon.com/assets/cms2/img/pokedex/detail/446.png'
                   }
          })
    }})
  }

  placeDeletedHandler = () => {
    this.setState(prevState => {
      return {
        places: prevState.places.filter((place) => {
          return place.key !== prevState.selectedItem.key
        }),
        selectedItem: null
      }
    })
  }

  closeDetailHandler = () => {
    this.setState({selectedItem: null})
  }

  render() {
    return (
      <View style={styles.container}>
        <ItemDetail selectedItem={this.state.selectedItem}
          deleteHandler={this.placeDeletedHandler}
          closeHandler={this.closeDetailHandler}
          fixedImage={{ "uri": 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
          image={this.state.selectedItem === null ? null : this.state.selectedItem.image}/>
        <InputComponent 
          onPlaceAdded={this.placeAddedHandler}
          />
       
        <PlacesList 
            places={this.state.places}
            itemSelected={this.itemSelectedHandler}
            onItemDeleted={this.placeDeletedHandler}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 26,
    marginTop: 30,
    height: 100,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start"
  }
});
