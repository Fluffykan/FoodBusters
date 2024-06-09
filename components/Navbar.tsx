import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import NavIconButtonWithOptionalText from './NavIconButtonWithOptionalText';

export default function Navbar() {

    // All buttons set to replaceScreen = true, i.e. no navigating back
    return (
        <View style={styles.NavbarContainer}>   
            <NavIconButtonWithOptionalText iconName='home' text='Home' replaceScreen={true} destination='/pages/homeScreen'/>
            <NavIconButtonWithOptionalText iconName='wallet' text='Wallet' replaceScreen={true} destination='/pages/walletScreen'/>
            <NavIconButtonWithOptionalText iconName='staro' text='FOTD' replaceScreen={true} destination='/pages/workInProgress'/>
            <NavIconButtonWithOptionalText iconName='profile' text='Profile' replaceScreen={true} destination='/pages/profilePage'/>
        </View>
    )
}

const styles = StyleSheet.create({
    NavbarText: {
        fontSize: 18,
    },
    NavbarContainer: {
        flexDirection: "row",
        justifyContent: 'space-around',
        width: "100%",
        backgroundColor: 'white',
    }
})