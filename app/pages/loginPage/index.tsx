import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { useState } from 'react';
import IconWithTitle from '@/components/IconWithTitle';
import InputBoxWithOptionalTitle from '../createAccount/components/inputBoxWithTitle';
import Button from '@/components/Button';
import HyperlinkButton from '@/components/HyperlinkButton';

export default function LoginPage() {
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
        console.log('login attempt');
        if (!hasEmptyField) {
            console.log('Username:' + username + ' Password:' + password);
        }
    }

    const hasEmptyField = username == '' || password == '';

    return (
        <View style={styles.container}>
            <IconWithTitle />
            <InputBoxWithOptionalTitle placeholder='Username' updaterFn={handleUsernameInput} />
            <InputBoxWithOptionalTitle placeholder='Password' updaterFn={handlePasswordInput} />
            {hasEmptyField && <Text style={{color: 'red'}}>Some fields are empty</Text>}
            <Button text='Login' bgColor='blue' textColor='white' border='rounded' fn={handleLogin} />
            <Link href='/pages/workInProgress' style={styles.redirectButton}>
                <Text style={styles.redirectButtonText}>Forgot Password</Text>
            </Link>
            <Link href='/pages/createAccount' style={styles.redirectButton}>
                <Text style={styles.redirectButtonText}>Create Account</Text>
            </Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20, 
        paddingRight: 20, 
        height: '100%', 
        justifyContent:'center'

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
        width: '100%',
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    }

})