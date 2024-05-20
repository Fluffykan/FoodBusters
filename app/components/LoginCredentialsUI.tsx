import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function LoginCredentialsUI() {
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

    return (
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
    )
}

const styles = StyleSheet.create({
    
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
})