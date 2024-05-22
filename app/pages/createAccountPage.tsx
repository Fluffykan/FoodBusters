import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { IconWithTitle } from '../components';
import { useState } from 'react';

export default function CreateAccountPage() {
    const [username, updateUsername] = useState('');
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');
    const [confirmPassword, updateConfirmPassword] = useState('');

    // TODO: 
    // CREATE LOGIC TO HANDLE ACCOUNT CREATION
    const handleCreateAccount = () => {
        if (!passwordMismatch && allFieldsFilled) {
            console.log('New Account : username: ' + username + ' email: ' + email + ' password: ' + password);
        }
    }
    const passwordMismatch = !(password === confirmPassword);
    const allFieldsFilled = !(username !== '' && password != '' && email !== '' && confirmPassword !== '');

    return (
        <View>
            <IconWithTitle />
            <Text style={styles.pageHeading}>Create Account</Text>
            <View style={styles.textInputContainer}>
                <Text>Username</Text>
                <TextInput style={styles.textInput} onChangeText={updateUsername} />
            </View>
            <View style={styles.textInputContainer}>
                <Text>Email</Text>
                <TextInput style={styles.textInput} onChangeText={updateEmail} />
            </View>
            <View style={styles.textInputContainer}>
                <Text>Password</Text>
                <TextInput style={styles.textInput} onChangeText={updatePassword} />
            </View>
            <View style={styles.textInputContainer}>
                <Text>Confirm Password</Text>
                <TextInput style={styles.textInput} onChangeText={updateConfirmPassword} />
                {passwordMismatch && <Text style={styles.errorMessage}>Passwords do not match</Text>}
            </View>
            <TouchableOpacity style={styles.registerButton} onPress={handleCreateAccount}>
                <Text style={styles.registerButtonText}>Register</Text>
                {allFieldsFilled && <Text style={styles.errorMessage}>Some fields are empty</Text>}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({

    pageHeading: {
        padding: 20,
        fontSize: 30,
        textDecorationLine: 'underline',
    },
    registerButtonText: {
        backgroundColor: 'blue',
        borderWidth: 1,
        borderRadius: 5,
        color: 'white', 
        textAlign: 'center'
    },
    registerButton: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
    },
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
        paddingBottom: 5,
    },
    errorMessage: {
        color: 'red',
        textDecorationLine: 'underline',
    }
})