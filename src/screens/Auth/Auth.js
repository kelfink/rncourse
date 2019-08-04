import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground } from 'react-native'
import DefaultInput from '../../components/ui/DefaultInput/DefaultInput'
import startMainTabs from '../MainTabs/startMainTabs'
import HeadingText from '../../components/ui/HeadingText/HeadingText'
import MainText from '../../components/ui/MainText/MainText'
import ButtonWithBackground from '../../components/ui/ButtonWithBackground/ButtonWithBackground'
import image from '../../../assets/squirtle_sm.jpg'
class AuthScreen extends Component {
    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape"
    }
    constructor(props) {
        super(props)
        Dimensions.addEventListener("change", (dims) => {
            console.log("dims changed", dims.window)
            console.log("Dimension height", Dimensions.get('window').height)
            this.setState( {
                viewMode: Dimensions.get('window').height > 500 
                    ? "portrait" : "landscape" 
            })
        })
    }

    loginHandler = () => {
        startMainTabs()
    }

    
    render () {
        let headingText = null
        if (this.state.viewMode === "portrait") {
            headingText = <MainText><HeadingText>
                Login Please {headingText}
                </HeadingText></MainText>
        }
        return (
            <ImageBackground 
            style={styles.imageBackground} 
              source={image}>
            <View style={styles.container}>
                {headingText}
                <ButtonWithBackground buttonType="secondary">Switch to Login</ButtonWithBackground>
                <View style={styles.inputContainer}>
                  <DefaultInput placeholder="Some Email Address" />
                  <View style={
                      this.state.viewMode === "portrait" ? styles.portraitPasswordContainer
                      : styles.landscapePasswordContainer
                      } >
                    <View style={
                        this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper
                          : styles.landscapePasswordWrapper}>
                      <DefaultInput placeholder="Password" />
                    </View>
                    <View style={
                        this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper
                          : styles.landscapePasswordWrapper}>
                      <DefaultInput placeholder="Confirm Password" />
                    </View>
                  </View>
                </View>
                <ButtonWithBackground onPress={this.loginHandler}>Submit</ButtonWithBackground>
            </View>
            </ImageBackground>
        )
    }
}

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    inputContainer: {
        width: "80%"
    },
    imageBackground: {
        width: "100%",
        flex: 1
    },
    input: {
        backgroundColor: "#ccc",
        borderColor: "#777"
    },
    landscapePasswordContainer: {
        flexDirection:  "row",
        justifyContent: "space-between"
    },
    portraitPasswordContainer: {
        flexDirection:  "column",
        justifyContent: "space-between"
    },
    landscapePasswordWrapper: {
        width:  "45%" 
    },
    portraitPasswordWrapper: {
        width:  "100%"
    }
})

export default AuthScreen