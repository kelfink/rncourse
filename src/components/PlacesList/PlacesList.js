import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native'


import ListItem from '../ListItem/ListItem'

const placesList = (props) => {
   return <FlatList style={styles.listContainer}
   data={props.places}
   renderItem={ (info) => (
        <ListItem  
          placeName={info.item.name}
          placeImage={info.item.image}
          onPressItem={() => props.itemSelected(info.item.key)}
        />
   )} />
}


const styles = StyleSheet.create({
    listContainer: {
        width: "100%"
    }
  });
export default placesList