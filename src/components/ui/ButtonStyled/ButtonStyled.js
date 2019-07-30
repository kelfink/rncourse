import React from 'react'
import { View, Button, StyleSheet} from 'react-native'

const buttonStyled = props => (
  <View style={styles.button}>
    <Button title={props.title} onPress={props.onPress}/>
  </View>
)

const styles = StyleSheet.create({
    button: {
        margin: 8,
        backgroundColor: "green"
    }
})
export default buttonStyled