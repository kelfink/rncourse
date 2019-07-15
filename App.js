/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View} from 'react-native';

import { connect } from 'react-redux'
import PlacesList from './src/components/PlacesList/PlacesList'
import InputComponent from './src/components/InputComponent/InputComponent'
import ItemDetail from './src/components/ItemDetail/ItemDetail'

import { addPlace, deletePlace, selectPlace, deselectPlace } from './src/store/actions/index'
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


class App extends Component {
  itemSelectedHandler = (key) => {
    this.props.onSelectPlace(key)
  }

  placeAddedHandler = (placeName) => {
    if (placeName.trim() === "") {
      return;
    }

    this.props.onAddPlace(placeName)
  }

  placeDeletedHandler = () => {
    this.props.onDeletePlace();
  }

  closeDetailHandler = () => {
    this.props.onDeselectPlace()
  }

  render() {
    return (
      <View style={styles.container}>
        <ItemDetail selectedItem={this.props.selectedPlace}
          deleteHandler={this.placeDeletedHandler}
          closeHandler={this.closeDetailHandler}
          fixedImage={{ "uri": 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
          image={this.props.selectedPlace === null ? null : this.props.selectedPlace.image}/>
        <InputComponent 
          onPlaceAdded={this.placeAddedHandler}
          />
       
        <PlacesList 
            places={this.props.places}
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

const mapStateToProps = state => {
  return {
    places: state.places.places,
    selectedPlace: state.places.selectedPlace
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddPlace: (name) => dispatch(addPlace(name)),
    onDeletePlace: (key) => dispatch(deletePlace(key)),
    onSelectPlace: (key) => dispatch(selectPlace(key)),
    onDeselectPlace: () => dispatch(deselectPlace())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
