import React, { Component} from 'react'

import { View, StyleSheet, Text } from 'react-native'
import ButtonStyled from '../ui/ButtonStyled/ButtonStyled'
//import imagePlaceholder from '../../../assets/pikachu.png'

class PickLocation extends Component {
  render() {
    return (
        <View style={styles.container}>
            <Text> Pick location </Text>
            <View style={styles.placeholder}><Text>Map</Text></View>
            <ButtonStyled title="locate me"/>
        </View>
   )
  }
}

           /*  
           */
const styles = StyleSheet.create({
    container: {
      backgroundColor: "grey",
      alignItems: "center",
      width: "100%"
    },
    placeholder: {
      borderWidth: 1,
      borderColor: "black",
      backgroundColor: "#eee",
      width: "80%",
      height: 150
  }
})
export default PickLocation