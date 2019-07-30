import React, { Component } from 'react';
import { View, Button, StyleSheet, ImageBackground } from 'react-native'
import DefaultInput from '../../components/ui/DefaultInput/DefaultInput'
import startMainTabs from '../MainTabs/startMainTabs'
import HeadingText from '../../components/ui/HeadingText/HeadingText'
import MainText from '../../components/ui/MainText/MainText'
import ButtonWithBackground from '../../components/ui/ButtonWithBackground/ButtonWithBackground'
import image from '../../../assets/squirtle_sm.jpg'
class AuthScreen extends Component {
    loginHandler = () => {
        startMainTabs()
    }

    render () {
        return (
            <ImageBackground 
            style={styles.imageBackground} 
              source={image}>
            <View style={styles.container}>

              <MainText>
                <HeadingText>Login Please</HeadingText> 
              </MainText>
                <ButtonWithBackground buttonType="secondary">Switch to Login</ButtonWithBackground>
                <View style={styles.inputContainer}>
                    <DefaultInput placeholder="Some Email Address" />
                    <DefaultInput placeholder="Password" />
                    <DefaultInput placeholder="Confirm Password" />
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
    }
})

export default AuthScreen