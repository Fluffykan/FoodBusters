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

    const handleCreateAccount = () => {
        // TODO: LINK TO BACKEND
        console.log('redirecting to create account page');
    }

    return (
        <View>
                <View style={styles.textInputContainer}>
                    <TextInput style={styles.textInput} placeholder="Username" onChangeText={handleUsernameInput} />
                </View>
                <View style={styles.textInputContainer}>
                   <TextInput style={styles.textInput} placeholder="Password" onChangeText={handlePasswordInput} />
                </View>
                <TouchableOpacity style={styles.textInputContainer} onPress={handleLogin}>
                    <Text style={styles.loginButton}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.redirectButton} onPress={handleForgettPassword}>
                    <Text style={styles.redirectButtonText}>Forgot Password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.redirectButton} onPress={handleCreateAccount}>
                    <Text style={styles.redirectButtonText}>Create Account</Text>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    
    textInput: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'rgb(227,227,227)',
        paddingLeft: 20,
    }, 
    textInputContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
        paddingBottom: 5
    },
    loginButton: {
        backgroundColor: 'blue',
        borderWidth: 1,
        borderRadius: 5,
        color: 'white', 
        textAlign: 'center'
    },
    redirectButtonText: {
        textDecorationLine: 'underline',
        color: 'blue',
        textAlign: 'center'
    },
    redirectButton: {
        padding: 10,
    },
})