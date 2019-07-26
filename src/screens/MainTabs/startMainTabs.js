import { Navigation } from 'react-native-navigation'
//import FindPlaceScreen from '../FindPlace/FindPlace';
import image1 from '../../../assets/mudkip.png'
import image2 from '../../../assets/pikachu.png'
import image3 from '../../../assets/ditto.jpg'
import Icon from 'react-native-vector-icons/Ionicons'

const startTabs = () => {
    Promise.all(
        [Icon.getImageSource('md-map', 30),
         Icon.getImageSource('ios-share-alt', 30),
         Icon.getImageSource('md-log-out', 30),
         Icon.getImageSource('ios-menu', 30)
    ]).then( sources => {

        
        Navigation.startTabBasedApp({
            tabs: [
                {
                    screen: "awesome-places.SharePlaceScreen",
                    label: "Share Place",
                    title: "Share Place",
                    icon: sources[1],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[3],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "awesome-places.FindPlaceScreen",
                    label: "Find Place l",
                    title: "Find Place!",
                    icon: sources[0],
                    navigatorButtons: {
                        leftButtons: [
                            {
                                icon: sources[3],
                                title: "Menu",
                                id: "sideDrawerToggle"
                            }
                        ]
                    }
                },
                {
                    screen: "awesome-places.AuthScreen",
                    label: "Sign out",
                    title: "Sign out",
                    icon: sources[2]
                }
            ],
            drawer: {
                left: {
                    screen: "awesome-places.SideDrawer",
                    title: "Some Side Drawer",
                }
            }
        })
    })
};

export default startTabs