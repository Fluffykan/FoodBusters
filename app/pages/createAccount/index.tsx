import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import IconWithTitle from '@/components/IconWithTitle';
import { useState } from 'react';
import InputBoxWithTitle from './components/inputBoxWithTitle';
import Button from '@/components/Button';

export default function CreateAccountPage() {
    const [username, updateUsername] = useState('');
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');
    const [confirmPassword, updateConfirmPassword] = useState('');

    const updateField = (fn: Function) => (s: string) => {
        fn(s);
        console.log(s);
    }

    // TODO: 
    // CREATE LOGIC TO HANDLE ACCOUNT CREATION
    const handleCreateAccount = () => {
        console.log('creating acct')
        if (!passwordMismatch && !hasEmptyField) {
            console.log('New Account : username: ' + username + ' email: ' + email + ' password: ' + password);
        }
    }
    const passwordMismatch = !(password === confirmPassword);
    const hasEmptyField = (username == '' || password == '' || email == '' || confirmPassword == '');

    return (
        <View style={styles.container}>
            <IconWithTitle />
            <Text style={styles.pageHeading}>Create Account</Text>
            <InputBoxWithTitle title='Username' placeholder='' updaterFn={updateField(updateUsername)} />
            <InputBoxWithTitle title='Email' placeholder='' updaterFn={updateField(updateEmail)} />
            <InputBoxWithTitle title='Password' placeholder='' updaterFn={updateField(updatePassword)} />
            <InputBoxWithTitle title = 'Confirm Password' placeholder='' updaterFn={updateField(updateConfirmPassword)} />
            {passwordMismatch && <Text style={styles.errorMessage}>Passwords do not match</Text>}
            <Button text='Register' border='rounded' fn={handleCreateAccount} />
            {hasEmptyField && <Text style={styles.errorMessage}>Some fields are empty</Text>}
        </View>
    )
}

const styles = StyleSheet.create({

    pageHeading: {
        padding: 20,
        fontSize: 30,
        textDecorationLine: 'underline',
    },
    container: {
        paddingLeft: 20, 
        paddingRight: 20, 
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