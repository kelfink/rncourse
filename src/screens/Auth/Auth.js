import React, { Component } from 'react';
import { View,
         KeyboardAvoidingView,
         Dimensions,
         StyleSheet,
         ImageBackground,
         TouchableWithoutFeedback,
         Keyboard
} from 'react-native'
import { connect } from 'react-redux'
import DefaultInput from '../../components/ui/DefaultInput/DefaultInput'
import startMainTabs from '../MainTabs/startMainTabs'
import HeadingText from '../../components/ui/HeadingText/HeadingText'
import MainText from '../../components/ui/MainText/MainText'
import ButtonWithBackground from '../../components/ui/ButtonWithBackground/ButtonWithBackground'
import image from '../../../assets/squirtle_sm.jpg'
import { validate } from '../../util/validation'
import { tryAuth } from '../../store/actions/index'
class AuthScreen extends Component {
    state = {
        viewMode: Dimensions.get("window").height > 500 ? "portrait" : "landscape",
        authMode: "login",
        controls: {
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                },
                touched: false
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                },
                touched: false
            },
            confirmPassword: {
                value: "",
                valid: false,
                validationRules: {
                    equalTo: 'password'
                },
                touched: false
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
        const authData = {
            email: this.state.controls.email.value,
            password: this.state.controls.password.value
        }
        this.props.onLogin()
        startMainTabs()
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                authMode: prevState.authMode === "login" ? "signup" : "login"
            }
        })
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
                        valid: validate(
                                value,
                                prevState.controls[key].validationRules,
                                connectedValue),
                        touched: true
                    }
                }
            }
        })
    }
    render () {
        let headingText = null
        let confirmPasswordControl = (
            null
        )
        if (this.state.authMode === 'signup') {
            confirmPasswordControl = (
                <View style={
                    this.state.viewMode === "portrait" ? styles.portraitPasswordWrapper
                        : styles.landscapePasswordWrapper}>
                    <DefaultInput
                        placeholder="Confirm Password"
                        style={styles.input}
                        value={this.state.controls.confirmPassword.value}
                        onChangeText={(val) => this.updateInputState('confirmPassword', val)}
                        valid={this.state.controls.confirmPassword.valid}
                        touched={this.state.controls.confirmPassword.touched}
                        secureTextEntry
                    />
                </View>
            )
        }
        if (this.state.viewMode === "portrait") {
            headingText = <MainText><HeadingText>
                Login Please {headingText}
                </HeadingText></MainText>
        }
        return (
            <ImageBackground 
            style={styles.imageBackground} 
              source={image}>
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                {headingText}
                <ButtonWithBackground
                    buttonType="secondary"
                    onPress={this.switchAuthModeHandler}>
                        Switch to {this.state.authMode === 'login' ? "Sign Up " : "Login"}
                    </ButtonWithBackground>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inputContainer}>
                  <DefaultInput
                     placeholder="Some Email Address"
                     style={styles.input}
                     value={this.state.controls.email.value}
                     onChangeText={(val) => this.updateInputState('email', val)}
                     valid={this.state.controls.email.valid}
                     touched={this.state.controls.email.touched}
                     autoCompleteType="email"
                     keyboardType="email-address"
                     autoCapitalize="none"
                     autoCorrect={false}
                     />
                  <View style={
                      this.state.authMode === "login" || this.state.viewMode === "portrait"
                        ? styles.portraitPasswordContainer
                        : styles.landscapePasswordContainer
                      } >
                    <View style={
                         this.state.authMode === "login" || this.state.viewMode === "portrait"
                          ? styles.portraitPasswordWrapper
                          : styles.landscapePasswordWrapper}>
                      <DefaultInput placeholder="Password"
                         style={styles.input}
                         value={this.state.controls.password.value}
                         onChangeText={(val) => this.updateInputState('password', val)}
                         valid={this.state.controls.password.valid}
                         touched={this.state.controls.password.touched}
                         secureTextEntry
                        />
                    </View>
                    {confirmPasswordControl}
                  </View>
                </View>
                </TouchableWithoutFeedback>
                <ButtonWithBackground
                    disabled={
                        !((this.state.authMode === 'login' || this.state.controls.confirmPassword.valid) &&
                        this.state.controls.password.valid &&
                        this.state.controls.email.valid)  }
                    onPress={this.loginHandler}>
                        Submit
                    </ButtonWithBackground>

            </KeyboardAvoidingView>
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
        backgroundColor: "#ccf"
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

const mapDispatchToProps = dispatch => {
    return {
        onLogin: (authData) => dispatch(tryAuth(authData))
    }
}
export default connect(null, mapDispatchToProps)(AuthScreen)