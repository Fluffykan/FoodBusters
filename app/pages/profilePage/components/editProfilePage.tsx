import { View, Text, StyleSheet, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import InputBoxWithOptionalTitle from '@/components/InputBoxWithTitle';
import Button from '@/components/Button';
import axios from 'axios';
import TopButtonPlusHeader from '@/components/TopButtonPlusHeader';
import { Redirect } from 'expo-router';

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
            axios.post('http://10.0.2.2:4200/editProfile', 
                    {username:oldCreds[1], password:password})
                .then(response => {
                    if (response.data.affectedRows != 1) {
                        throw Error;
                    }
                    axios.post("http://10.0.2.2:4200/updateUserCreds", {id:oldCreds[0],username:oldCreds[1], email:oldCreds[2], password:password});
                    console.log(`Success! New Profile details: username=${oldCreds[1]},email=${oldCreds[2]},password=${password}`)
                    showAlert();
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
        <View style={styles.container}>
            <TopButtonPlusHeader header='FoodBuster' transparentBg={true} destination='/pages/profilePage' replaceScreen={true} />
            <Text style={styles.pageHeading}>Edit Profile</Text>
            <InputBoxWithOptionalTitle title='Username' defaultValue={oldCreds[1]} updaterFn={() => {}} editable={false} />
            <InputBoxWithOptionalTitle title='Email' defaultValue={oldCreds[2]} updaterFn={() => {}} editable={false} />
            <InputBoxWithOptionalTitle title='Password' placeholder='' updaterFn={updatePassword} />
            <InputBoxWithOptionalTitle title = 'Confirm Password' placeholder='' updaterFn={updateConfirmPassword} />
            {passwordMismatch && <Text style={styles.errorMessage}>Passwords do not match</Text>}
            <Button text='Save Changes' border='rounded' fn={handleEditProfile} />
            {hasEmptyField && <Text style={styles.errorMessage}>Some fields are empty</Text>}
            {emailTaken && <Text style={styles.errorMessage}>Email or Username has already been taken, try another email</Text>}
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