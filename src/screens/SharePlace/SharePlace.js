import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { validate } from '../../util/validation'
import PlaceInput from '../../components/PlaceInput/PlaceInput'
import { addPlace } from '../../store/actions/index'
import MainText from '../../components/ui/MainText/MainText'
import HeadingText from '../../components/ui/HeadingText/HeadingText'
import ImagePicker from '../../components/ui/ImagePicker/ImagePicker'
import PickLocation from '../../components/PickLocation/PickLocation'
import ButtonWithBackground from '../../components/ui/ButtonWithBackground/ButtonWithBackground'
class SharePlaceScreen extends Component {

    static navigatorStyle = {
        navBarButtonColor: "orange"
    }

    state = {
        placeName: "",
        controls: {
            placeName: {
                value: "",
                valid: false,
                touched: false,
                validationRules: {
                    notEmpty: true
                }
            }
        }
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
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    placeName: {
                        ...prevState.controls.placeName,
                        value: value,
                        valid: validate(value, prevState.controls.placeName.validationRules),
                        touched: true
                    }
                }
            }
        })
    }

    placeAddedHandler = () => {
        console.log("Place added", this.state)
        if (this.state.controls.placeName.value.trim() !== "") {
            console.log("adding", this.state.controls.placeName.value)
            this.props.onAddPlace(this.state.controls.placeName.value)
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
                  placeData={this.state.controls.placeName}
                  onChangeText={this.placeNameChangeHandler}
                  />
                <ButtonWithBackground
                    disabled={
                        !this.state.controls.placeName.valid }
                    onPress={this.placeAddedHandler}>
                        Share the place
                    </ButtonWithBackground>
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