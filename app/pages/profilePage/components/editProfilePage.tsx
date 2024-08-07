import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import InputBoxWithOptionalTitle from '@/components/InputBoxWithTitle';
import Button from '@/components/Button';
import axios from 'axios';
import TopButtonPlusHeader from '@/components/TopButtonPlusHeader';
import { Redirect } from 'expo-router';
import Navbar from '@/components/Navbar';
import NavIconButtonWithOptionalText from '@/components/NavIconButtonWithOptionalText';
import Header from '@/components/Header';

export default function EditProfilePage() {
    const [password, updatePassword] = useState('');
    const [confirmPassword, updateConfirmPassword] = useState('');
    const [emailTaken, updateEmailTaken] = useState(false);
    const [oldCreds, setOldCreds] = useState<string[]>([]);

    const getUserCreds = async () => {
        try {
            const result = await axios.get("http://10.0.2.2:4200/getUserCreds");
            setOldCreds(result.data);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getUserCreds();
    },[])

    const handleEditProfile = () => {
        if (!passwordMismatch && !hasEmptyField) {
            updateEmailTaken(false);
            console.log(oldCreds[2])
            axios.post('http://10.0.2.2:4200/resetPassword', 
                    {email:oldCreds[2], password_hash:password})
                .then(response => {
                    if (response.status == 500) {
                        throw Error;
                    }
                    // login used to save user creds to userCreds.txt
                    axios.post('http://10.0.2.2:4200/login', {email:oldCreds[2], password_hash:password});
                })
                .catch(error => {
                    // if email has been used, display the error for user to see
                    updateEmailTaken(true);
                    console.log('Error: cannot edit profile', error);
                });
        }
    }
    const passwordMismatch = !(password === confirmPassword);
    const hasEmptyField = (password == '' || confirmPassword == '');

    const [redirect, setRedirect] = useState(false);
    const showAlert = () => {
        Alert.alert(
          'Password Successfuly Reset',
          '',
          [
            {
              text: 'Back to Profile Page',
              onPress: () => setRedirect(true),
              style: 'cancel',
            },
          ],
          {
            cancelable: true,
          },
        )
    };

    if (redirect) {
        return (
            <Redirect href='/pages/profilePage' />
        )
    }

    return (
        <View style={{justifyContent:'space-between', flex: 1,}}>
            <Header header='FoodBuster' />
            <ScrollView style={styles.container}>
                <Text style={styles.pageHeading}>Edit Profile</Text>
                <InputBoxWithOptionalTitle title='Username' defaultValue={oldCreds[1]} updaterFn={() => {}} editable={false} />
                <InputBoxWithOptionalTitle title='Email' defaultValue={oldCreds[2]} updaterFn={() => {}} editable={false} />
                <InputBoxWithOptionalTitle title='Password' placeholder='' updaterFn={updatePassword} />
                <InputBoxWithOptionalTitle title = 'Confirm Password' placeholder='' updaterFn={updateConfirmPassword} />
                {passwordMismatch && <Text style={styles.errorMessage}>Passwords do not match</Text>}
                <Button text='Save Changes' border='rounded' fn={handleEditProfile} />
                {hasEmptyField && <Text style={styles.errorMessage}>Some fields are empty</Text>}
                {emailTaken && <Text style={styles.errorMessage}>Email or Username has already been taken, try another email</Text>}
                <Text style={styles.pageHeading}>Edit Food Preferences</Text>
                <NavIconButtonWithOptionalText iconName='form' destination='pages/indicatePreferencePage' replaceScreen={false} text='Go to Change Preferences' flexDir='row' />
            </ScrollView>
            <Navbar />
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