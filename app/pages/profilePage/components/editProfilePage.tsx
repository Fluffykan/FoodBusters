import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import InputBoxWithOptionalTitle from '@/components/InputBoxWithTitle';
import Button from '@/components/Button';
import axios from 'axios';
import NavIconButtonWithOptionalText from '@/components/NavIconButtonWithOptionalText';
import TopButtonPlusHeader from '@/components/TopButtonPlusHeader';

export default function EditProfilePage() {
    const [username, updateUsername] = useState('');
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState('');
    const [confirmPassword, updateConfirmPassword] = useState('');
    const [emailTaken, updateEmailTaken] = useState(false);
    const [successfulEdit, updateSuccessfulEdit] = useState(false);
    const [oldCreds, setOldCreds] = useState<string[]>([]);

    const getUserCreds = async () => {
        try {
            const result = await axios.get("http://10.0.2.2:4200/getUserCreds");
            setOldCreds(result.data);
            updateUsername(result.data[0]);
            updateEmail(result.data[1]);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        getUserCreds();
    },[])
    // TODO: 
    // CREATE LOGIC TO HANDLE ACCOUNT CREATION
    const handleEditProfile = () => {
        console.log('creating acct')
        if (!passwordMismatch && !hasEmptyField) {
            updateEmailTaken(false);
            axios.post('http://10.0.2.2:4200/editProfile', 
                    {username:username, email:email, password:password, 
                        oldUsername:oldCreds[0], oldEmail:oldCreds[1], oldPassword:oldCreds[2]})
                .then(response => {
                    console.log(response.data)
                    if (response.data.affectedRows != 1) {
                        throw Error;
                    }
                    axios.post("http://10.0.2.2:4200/updateUserCreds", {username:username, email:email, password:password});
                    console.log(`Success! New Profile details: username=${username},email=${email},password=${password}`)
                    updateSuccessfulEdit(true);
                })
                .catch(error => {
                    // if email has been used, display the error for user to see
                    updateEmailTaken(true);
                    console.log('Error: cannot edit profile', error);
                });
        }
    }
    const passwordMismatch = !(password === confirmPassword);
    const hasEmptyField = (username == '' || password == '' || email == '' || confirmPassword == '');

    if (successfulEdit) {
        return (
            <View style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.pageHeading}>Profile Successfully Edited!</Text>
                <NavIconButtonWithOptionalText destination='/pages/profilePage' iconName='enter' text='Back To Login' replaceScreen={true} flexDir='row' border={true} />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <TopButtonPlusHeader header='FoodBuster' transparentBg={true} destination='/pages/profilePage' replaceScreen={true} />
                <Text style={styles.pageHeading}>Edit Profile</Text>
                <InputBoxWithOptionalTitle title='Username' placeholder={oldCreds[0]} updaterFn={updateUsername} />
                <InputBoxWithOptionalTitle title='Email' placeholder={oldCreds[1]} updaterFn={updateEmail} />
                <InputBoxWithOptionalTitle title='Password' placeholder='' updaterFn={updatePassword} />
                <InputBoxWithOptionalTitle title = 'Confirm Password' placeholder='' updaterFn={updateConfirmPassword} />
                {passwordMismatch && <Text style={styles.errorMessage}>Passwords do not match</Text>}
                <Button text='Save Changes' border='rounded' fn={handleEditProfile} />
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