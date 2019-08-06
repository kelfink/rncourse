import React, { Component } from 'react';
import { View, Dimensions, StyleSheet, ImageBackground } from 'react-native'
import DefaultInput from '../../components/ui/DefaultInput/DefaultInput'
import startMainTabs from '../MainTabs/startMainTabs'
import HeadingText from '../../components/ui/HeadingText/HeadingText'
import MainText from '../../components/ui/MainText/MainText'
import ButtonWithBackground from '../../components/ui/ButtonWithBackground/ButtonWithBackground'
import image from '../../../assets/squirtle_sm.jpg'
import { validate } from '../../util/validation'
class AuthScreen extends Component {
    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                }
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                }
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: 'password'
                }
            },
        }
    }
    constructor(props) {
        super(props)
        console.log("construct", this.state.controls)
        Dimensions.addEventListener("change", this.updateViewMode)
    }

    componentWillUnmount() {
        Dimensions.removeEventListener('change', this.updateViewMode)
    }
    
    updateViewMode = (dims) => {
        this.setState( {
            viewMode: Dimensions.get('window').height > 500
                ? "portrait" : "landscape"
        })
    }
    loginHandler = () => {
        startMainTabs()
    }

    updateInputState = (key, value) => {
        let connectedValue = {}
        if (this.state.controls[key].validationRules.equalTo) {
            const equalControl = this.state.controls[key].validationRules.equalTo
            const equalValue = this.state.controls[equalControl].value
            connectedValue = {
                ...connectedValue,
                equalTo: equalValue
            }
        }
        if ( key === 'password' ) {
            connectedValue = {
                ...connectedValue,
                equalTo: value
            }
        }
        this.setState(prevState => {
            return {
                controls: {
                    ...prevState.controls,
                    confirmPassword: {
                        ...prevState.controls.confirmPassword,
                        valid:
                        key === 'password' ?
                            validate(
                                prevState.controls.confirmPassword.value,
                                prevState.controls.confirmPassword.validationRules,
                                connectedValue
                            )
                            : prevState.controls.confirmPassword.valid
                    },
                    [key]: {
                        ...prevState.controls[key],
                        value: value,
                        valid: validate(value,
                            prevState.controls[key].validationRules,
                            connectedValue)
                    }
                }
            }
        })
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
                  <DefaultInput
                     placeholder="Some Email Address"
                     style={[styles.input, (this.state.controls.email.valid ? null : {borderColor: 'red'})]}
                     value={this.state.controls.email.value}
                     onChangeText={(val) => this.updateInputState('email', val)}
                     />
                  <View style={
                      this.state.viewMode === "portrait" ? styles.portraitPasswordContainer
                      : styles.landscapePasswordContainer
                      } >
                    <View style={
                        this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper
                          : styles.landscapePasswordWrapper}>
                      <DefaultInput placeholder="Password"
                         style={[styles.input, (this.state.controls.password.valid ? null : {borderColor: 'red'})]}
                         value={this.state.controls.password.value}
                         onChangeText={(val) => this.updateInputState('password', val)}
                      />
                    </View>
                    <View style={
                        this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper
                          : styles.landscapePasswordWrapper}>
                      <DefaultInput
                        placeholder="Confirm Password"
                        style={[styles.input, (this.state.controls.confirmPassword.valid ? null : {borderColor: 'red'})]}
                        onChangeText={(val) => this.updateInputState('confirmPassword', val)} />
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
        backgroundColor: "#ccf",
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