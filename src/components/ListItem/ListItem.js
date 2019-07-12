import React from 'react';

import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native'


const listItem = (props) => {

   return (
   <TouchableOpacity onPress={props.onPressItem}>
        <View style={styles.listItem}>
            <Image style={styles.placeImage}
             source={props.placeImage}/>
            <Text>{props.placeName}</Text>
        </View>
   </TouchableOpacity>)
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: "row",
        width: "100%",
        padding: 5,
        marginBottom: 2,
        backgroundColor: "#ccc",
        alignItems: "center",
        height: 40
    },
    placeImage: {
        marginRight: 8,
        height: 30,
        width: 30
    }
})
export default listItem