import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { IconWithTitle, LoginCredentialsUI } from "../components";


export default function loginPage() {


    /* TODO: 
        REPLACE CIRCLE WITH A LOGO
        CHANGE FONT (IF NEEDED)
    */
    return (
        <View style={styles.loginPage}>
            <IconWithTitle />
            <LoginCredentialsUI />
        </View>
    );
}

const styles = StyleSheet.create({
    loginPage: { 
        paddingTop: '50%',
        paddingBottom: '50%'
      }, 
})