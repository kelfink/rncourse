import React, { Component } from 'react'
import { Platform, Modal, View, Image, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { deletePlace } from '../../store/actions/index'
import Icon from 'react-native-vector-icons/Ionicons'

class PlaceDetail extends Component {

    placeDeleteHandler = () => {
        this.props.onDeletePlace(this.props.selectedPlace.key)
        this.props.navigator.pop();
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Image source={this.props.selectedPlace.image} 
                    style={{borderWidth: 1, width: 50, height: 50}} />
                    <Text>{this.props.selectedPlace.name}</Text>
                </View>
                <View style={styles.sidebyside}>
                    <TouchableOpacity>
                        <Icon size={30} name={Platform.OS === "android" ? "md-trash" : "ios-trash"} color="red" onPress={this.placeDeleteHandler}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
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

const mapDispatchToProps = dispatch => { 
    return {
        onDeletePlace: (key) => dispatch(deletePlace(key))
    }
}
export default connect(null, mapDispatchToProps)(PlaceDetail);