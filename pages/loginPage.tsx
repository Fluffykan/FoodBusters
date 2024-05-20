import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { useState } from 'react';


export default function loginPage() {
    const [username, updateUsername] = useState('');
    const [password, updatePassword] = useState('');

    const handleUsernameInput = (newUsername:string) => {
        updateUsername(newUsername);
    }

    const handlePasswordInput = (newPassword:string) => {
        updatePassword(newPassword);
    }

    const handleLogin = () => {
        // TODO: LINK TO BACKEND
        console.log('login attempt: Username:' + username + ' Password:' + password);
    }

    const handleForgettPassword = () => {
        // TODO: LINK TO BACKEND
        console.log('redirecting to reset password');
    }

    /* TODO: 
        REPLACE CIRCLE WITH A LOGO
        CHANGE FONT (IF NEEDED)
    */
    return (
        <View style={styles.loginPage}>
            <View style={styles.appNameAndIconView}>
                <View style={styles.logoPlaceholder}></View>
                <Text style={styles.appName}>FoodBusters</Text>
            </View>
            <View>
                <View style={styles.loginCredentialsView}>
                    <TextInput style={styles.loginCredentialsField} placeholder="Username" onChangeText={handleUsernameInput} />
                </View>
                <View style={styles.loginCredentialsView}>
                   <TextInput style={styles.loginCredentialsField} placeholder="Password" onChangeText={handlePasswordInput} />
                </View>
                <TouchableOpacity style={styles.loginCredentialsView} onPress={handleLogin}>
                    <Text style={styles.loginButton}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleForgettPassword}>
                    <Text style={styles.forgotPasswordButton}>Forgot Password</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    appNameAndIconView: {
        flexDirection: 'row',
        justifyContent: 'center',

    },
    logoPlaceholder: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: 'tomato'
    },
    appName: {
        fontSize: 50
    },
    loginCredentialsField: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'rgb(227,227,227)',
        paddingLeft: 20,
    }, 
    loginCredentialsView: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5
    },
    loginButton: {
        backgroundColor: 'blue',
        borderWidth: 1,
        borderRadius: 10,
        color: 'white', 
        textAlign: 'center'
    },
    forgotPasswordButton: {
        textDecorationLine: 'underline',
        color: 'blue',
        textAlign: 'center'
    },
    loginPage: { 
        paddingTop: '50%',
        paddingBottom: '50%'
      }, 

})