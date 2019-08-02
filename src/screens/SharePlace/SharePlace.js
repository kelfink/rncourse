import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
//import InputComponent from '../../components/InputComponent/InputComponent'
import PlaceInput from '../../components/PlaceInput/PlaceInput'
import { addPlace } from '../../store/actions/index'
import MainText from '../../components/ui/MainText/MainText'
import HeadingText from '../../components/ui/HeadingText/HeadingText'
import ButtonStyled from '../../components/ui/ButtonStyled/ButtonStyled'
import DefaultInput from '../../components/ui/DefaultInput/DefaultInput'
import ImagePicker from '../../components/ui/ImagePicker/ImagePicker'
import imagePlaceholder from '../../../assets/pikachu.png'
import PickLocation from '../../components/PickLocation/PickLocation'

class SharePlaceScreen extends Component {

    state = {
        placeName: ""
    }

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
    placeNameChangeHandler = (value) => { 
        this.setState({placeName: value})
    }

    placeAddedHandler = () => {
        console.log("Place added", this.state)
        if (this.state.placeName.trim() !== "") {
            console.log("adding", this.state.placeName)
            this.props.onAddPlace(this.state.placeName)
        }
    }
    render() {
        return (
            <ScrollView>
                <MainText><HeadingText>Share a Pokémon with us
                </HeadingText></MainText>

                <ImagePicker/>
                <PickLocation/>
                <PlaceInput 
                  placeName={this.state.placeName}
                  onChangeText={this.placeNameChangeHandler}
                  />
                 <ButtonStyled title="Share the place"
                   onPress={this.placeAddedHandler}/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    button: {},
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "80%",
        height: 150
    },
    previewImage: {
        width: "100%",
        height: "100%"
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(addPlace(placeName))
    }
}
export default connect(null, mapDispatchToProps)(SharePlaceScreen)