import React, {Component} from 'react';
import {Button, TextInput, View, StyleSheet} from 'react-native'

 export default class InputComponent extends Component {
    state = {
        placeName: ""
    }

    placeNameChangeHandler = (value) => { 
        this.setState({placeName: value})
    }
    
    placeSubmitHandler = () => {
        if (this.state.placeName.trim() === "") {
            return
        }
        this.props.onPlaceAdded(this.state.placeName)
    }
    render() { 
    return  (
    <View style={styles.inputContainer}>
        <TextInput style={styles.placeInput}
        placeholder='An awesome place'
        inlineImageLeft='search_icon'
        onChangeText={this.placeNameChangeHandler} value={this.state.placeName}/>
        <Button title="Add" style={styles.placeButton}
            onPress={this.placeSubmitHandler}/>
        </View>
        )
   }
 }

 const styles = StyleSheet.create({
    inputContainer: {
      // flex: 1,
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center"
    },
    placeInput: {
      width: "70%"
    },
    placeButton: {
      width: "30%"
    }
  });

 