import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import PlaceList from '../../components/PlacesList/PlacesList'
class FindPlaceScreen extends Component {
    render() {
        return (
            <View>
                <Text>On the FindPlaceScreen</Text>
                <PlaceList places={this.props.places} />
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