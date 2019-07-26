import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { deletePlace } from '../../store/actions/places'
import PlaceList from '../../components/PlacesList/PlacesList'
class FindPlaceScreen extends Component {
    itemSelectedHandler = key => {
        const selPlace = this.props.places.find(place => {
            return place.key === key;
        })
        this.props.navigator.push( {
            screen: "awesome-places.PlaceDetailScreen",
            title: "Details about " + selPlace.name,
            passProps: {
                selectedPlace: selPlace,
                deleteHandler: deletePlace
            }
        })
    }
    render() {
        return (
            <View>
                <Text>On the Find Place Screen</Text>
                <PlaceList places={this.props.places} itemSelected={this.itemSelectedHandler}/>
                </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        places: state.places.places
    }
}
export default connect(mapStateToProps)(FindPlaceScreen)