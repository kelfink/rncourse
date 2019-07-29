import React from 'react'
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native'
const buttonWithBackground = props => (
    <TouchableOpacity onPress={props.onPress}>
        <View style={[props.buttonType === "secondary" ? styles.secondaryButton : styles.button, props.color ? {backgroundColor: props.color} : null]}>
            <Text>{props.children}</Text>
        </View>
    </TouchableOpacity>
)

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "orange"
    },
    secondaryButton: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "green"
    },
})

export default buttonWithBackground