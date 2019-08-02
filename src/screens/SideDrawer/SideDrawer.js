import React, { Component } from 'react'
import { Platform } from 'react-native'
import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'


class SideDrawer extends Component {
    signOut = () => {
        console.log("sign out", this.props.navigator)
        /*this.props.navigator.resetTo( {
            component: "awesome-places.AuthScreen",
            title: "Sign in"
        })*/

    }
    render () {
        return (
            <View style={[styles.container, { width: Dimensions.get("window").width * 0.8}]}>
              <TouchableOpacity>
                <View style={styles.drawerItem}>
                    <Text> Log Out !</Text>
                    <Icon style={styles.drawerItemIcon} size={20} 
                      name={Platform.OS === 'android' ? "md-log-out" : "ios-log-out"} 
                      color="#aaa" onPress={this.signOut}/>
                </View>
              </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        backgroundColor: "#eee",
        flex: 1,
        padding: 10
    },
    drawerItem: {
        flexDirection: "row",
        alignItems: "center"
    },
    drawerItemIcon: {
        margin: 5
    }
})
export default SideDrawer