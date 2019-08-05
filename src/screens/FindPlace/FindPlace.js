import React, { Component } from 'react'
import { Animated, View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { deletePlace } from '../../store/actions/places'
import PlaceList from '../../components/PlacesList/PlacesList'

class FindPlaceScreen extends Component {
    static navigatorStyle = {
        navBarButtonColor: "brown"
    }
    state = {
        placesLoaded: false,
        removeAnimation: new Animated.Value(1),
        loadedAnimation: new Animated.Value(0)
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
        // my own idea for letting us retry the animation. WHen we navigate here, mark it as unloaded.
        this.setState({
            placesLoaded: false
        })
    }

    placesLoadedHandler = () => {
        console.log("Loaded Handler", this.state)
        Animated.timing(this.state.loadedAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true}).start()
    }
    placesSearchHandler = () => {
        console.log("placesSearchHandler mark as loaded", this.state)
        Animated.timing(this.state.removeAnimation, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
           }).start(() => {
            this.setState({
                placesLoaded: true
            })
            this.placesLoadedHandler();
       })

        //this.setState({placesLoaded: true})
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
        const spin = this.state.removeAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '360deg']
          })
        let content = this.state.placesLoaded
                ?  ( 
                    <Animated.View style={{
                        opacity: this.state.loadedAnimation
                          }}>
                       <PlaceList places={this.props.places} itemSelected={this.itemSelectedHandler}/>
                    </Animated.View>)
                : (<Animated.View style={{
                      opacity: this.state.removeAnimation,
                      transform: [
                          {
                              scale: this.state.removeAnimation.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [2, 1]
                              }),
                          },
                          {
                            rotate: spin
                          }
                      ]
                }}>
                    <TouchableOpacity onPress={this.placesSearchHandler}>
                    <View style={styles.searchButton}>
                        <Text style={styles.searchButtonText}>
                                Loading maybe
                        </Text>
                    </View>
                   </TouchableOpacity>
                 </Animated.View>)
        return (
            <View style={this.state.placesLoaded ? null : styles.buttonContainer}>
                  {content}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    listContainer: {

    },
    searchButton: {
        borderColor: "orange",
        borderWidth: 1,
        borderRadius: 50,
        padding: 20
    },
    searchButtonText: {
        color: "orange",
        fontWeight: "bold",
        fontSize: 26
    }
})
const mapStateToProps = state => {
    return {
        places: state.places.places
    }
}
export default connect(mapStateToProps)(FindPlaceScreen)