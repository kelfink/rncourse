import React, { Component } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import DefaultInput from '../../components/ui/DefaultInput/DefaultInput'
import startMainTabs from '../MainTabs/startMainTabs'

class AuthScreen extends Component {
    loginHandler = () => {
        startMainTabs()
    }

    render () {
        return (
            <View style={styles.container}>
                <Text>Login Please</Text> 
                <Button title="Switch to login" />
                <View style={styles.inputContainer}>
                    <DefaultInput placeholder="Some Email Address" />
                    <DefaultInput placeholder="Password" />
                    <DefaultInput style={styles.input} placeholder="Confirm Password" />
                </View>
                <Button title="Submit!" 
                  onPress={this.loginHandler}/>
            </View>
        )
    }
}

const styles =  StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    inputContainer: {
        width: "80%"
    },
    input: {
        backgroundColor: "#ccc",
        borderColor: "#777"
    }
})

export default AuthScreen