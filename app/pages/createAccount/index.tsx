import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';
import InputBoxWithOptionalTitle from '@/components/InputBoxWithTitle';
import Button from '@/components/Button';
import axios from 'axios';
import NavIconButtonWithOptionalText from '@/components/NavIconButtonWithOptionalText';
import TopButtonPlusHeader from '@/components/TopButtonPlusHeader';

export default function CreateAccountPage() {
    const [username, updateUsername] = useState('');
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');
    const [confirmPassword, updateConfirmPassword] = useState('');
    const [emailTaken, updateEmailTaken] = useState(false);
    const [successfulCreation, updateSuccessfulCreation] = useState(false);

    // TODO: 
    // CREATE LOGIC TO HANDLE ACCOUNT CREATION
    const handleCreateAccount = () => {
        console.log('creating acct')
        if (!passwordMismatch && !hasEmptyField) {
            updateEmailTaken(false);
            axios.post('http://10.0.2.2:4200/createAccount', {username:username, email:email, password_hash:password})
                .then(response => {
                    console.log(`Success! New Account: username=${username},email=${email},password=${password}`)
                    updateSuccessfulCreation(true);
                })
                .catch(error => {
                    // if email has been used, display the error for user to see
                    updateEmailTaken(true);
                    console.log('Error: cannot create account', error);
                });
        }
    }
    const passwordMismatch = !(password === confirmPassword);
    const hasEmptyField = (username == '' || password == '' || email == '' || confirmPassword == '');

    if (successfulCreation) {
        return (
            <View style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.pageHeading}>Account Creation Success!</Text>
                <NavIconButtonWithOptionalText destination='/pages/loginPage' iconName='enter' text='Back To Login' replaceScreen={true} flexDir='row' border={true} />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <TopButtonPlusHeader header='FoodBuster' transparentBg={true} destination='/pages/loginPage' replaceScreen={true} />
                <Text style={styles.pageHeading}>Create Account</Text>
                <InputBoxWithOptionalTitle title='Username' placeholder='' updaterFn={updateUsername} />
                <InputBoxWithOptionalTitle title='Email' placeholder='' updaterFn={updateEmail} />
                <InputBoxWithOptionalTitle title='Password' placeholder='' updaterFn={updatePassword} />
                <InputBoxWithOptionalTitle title = 'Confirm Password' placeholder='' updaterFn={updateConfirmPassword} />
                {passwordMismatch && <Text style={styles.errorMessage}>Passwords do not match</Text>}
                <Button text='Register' border='rounded' fn={handleCreateAccount} />
                {hasEmptyField && <Text style={styles.errorMessage}>Some fields are empty</Text>}
                {emailTaken && <Text style={styles.errorMessage}>Email has already been used, try another email</Text>}
            </View>
        )
    }

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
    buttonText: {
        borderWidth: 1,
        borderRadius: 5, 
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    button: {
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