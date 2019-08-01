import React, { Component} from 'react'

import { View, Image, StyleSheet } from 'react-native'
import ButtonStyled from '../ButtonStyled/ButtonStyled'
import imagePlaceholder from '../../../../assets/pikachu.png'


export default class ImagePicker extends Component {
  render() {
    return (
    <View style={styles.container}>
      <View style={styles.placeholder}>
        <Image style={styles.previewImage}  source={imagePlaceholder}/>
      </View>
      <ButtonStyled title="pick image"/>
    </View>)
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "transparent",
      alignItems: "center"
    },
    placeholder: {
      borderWidth: 1,
      borderColor: "black",
      backgroundColor: "#eee",
      width: "80%",
      height: 150
  },
  previewImage: {
      width: "100%",
      height: "100%"
  }
})