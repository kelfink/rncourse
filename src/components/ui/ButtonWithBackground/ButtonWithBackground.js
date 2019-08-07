import React from 'react'
import { TouchableOpacity, TouchableNativeFeedback, Text, 
         View, StyleSheet, Platform } from 'react-native'

const buttonWithBackground = props => {
    const content = (
      <View style={[props.buttonType === "secondary" 
                    ? styles.secondaryButton 
                    : styles.button, props.color 
                        ? {backgroundColor: props.color} 
                        : null, (props.disabled ? styles.disabled : null)]}>
        <Text>{props.children}</Text>
      </View>)
    if (Platform.OS === 'android' ) {
        return props.disabled ? ( [content] ) : (
            <TouchableNativeFeedback onPress={props.onPress}>
               {content}
            </TouchableNativeFeedback>
        )
    }

    return props.disabled ? ( [content]) : (
        <TouchableOpacity onPress={props.onPress}>
            {content}
        </TouchableOpacity>
    )
}

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
    disabled: {
        backgroundColor: "#ccc", 
        color: "#aaa",
        borderColor: "#aaa"
    }
})

export default buttonWithBackground