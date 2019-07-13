import React from 'react'
import { Modal, View, Image, Text, Button, StyleSheet } from 'react-native'
const itemDetail = props => {
    let modalContent = 'ok'
    if (props.selectedItem !== null) {
        modalContent = 
             <View>
                <Image source={props.selectedItem.image} 
                  style={{borderWidth: 1, width: 50, height: 50}} />
                <Text>{props.selectedItem.name}</Text>
            </View>
    } else {
        modalContent =  <View>
    </View>
    }
    return (
        <Modal visible={props.selectedItem !== null} animationType="slide">
          <View style={styles.modalContainer}>
              {modalContent}
              <View style={styles.sidebyside}>
                <Button style={styles.buttn} title="Delete" color="red" onPress={props.deleteHandler}/>
                <Button style={styles.buttn} title="OK" color="green" onPress={props.closeHandler}/>
              </View>
          </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    modalContainer: {
        margin: 62
    },
    sidebyside: {
        //flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
    placeInput: {
    width: "50%"
    },
    listImage: { borderWidth: 2, marginRight: 8, width: 28, height: 28},
    placeImage: { width: "20%",
                height: 40, borderWidth: 1
    },
    buttn: { 
        backgroundColor: '#77f'
    }
})

export default itemDetail;