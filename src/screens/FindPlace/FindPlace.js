import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { deletePlace } from '../../store/actions/places'
import PlaceList from '../../components/PlacesList/PlacesList'
class FindPlaceScreen extends Component {
    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent);
    }

    onNavigatorEvent = event => {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'sideDrawerToggle') {
                 this.props.navigator.toggleDrawer({
                     side: "left"
                 })
            }
        }
    }
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