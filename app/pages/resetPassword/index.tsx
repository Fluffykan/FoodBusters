import InputBoxWithOptionalTitle from "@/components/InputBoxWithTitle";
import Button from "@/components/Button";
import { View, StyleSheet, Text, Alert } from 'react-native';
import { useState } from "react";
import axios from 'axios';
import TopButtonPlusHeader from "@/components/TopButtonPlusHeader";
import { Redirect } from "expo-router";

export default function ResetPassword() {
    const [email, updateEmail] = useState('');
    const [newPassword, updateNewPassword] = useState('');
    const [confirmNewPassword, updateConfirmNewPassword] = useState('');
    const [resetPasswordSuccess, updateResetPasswordSuccess] = useState(false);
    const [attemptedResetPassword, updateAttempt] = useState(false);

    const passwordMismatch = newPassword != confirmNewPassword;
    const hasEmptyFields = email == "" || newPassword == "" || confirmNewPassword == "";

    // does using post / put matter in this case? i think they serve the same purpose
    const handleResetPassword = () => {
        console.log('resetting password');
        if (!(passwordMismatch || hasEmptyFields)) {
            axios.post("http://10.0.2.2:4200/resetPassword", {email:email, password_hash:newPassword})
                .then(response => {
                    console.log('reset password success');
                    const status = response.status;
                    showAlert(status == 200);
                    updateAttempt(true);
                })
                .catch(error => {
                    console.error('error in resetting password', error);
                    updateAttempt(true);
                })
        } else {
            console.error('password mismatch');
        }
    }

    const showAlert = (b:boolean) => {
        if (b) {
            Alert.alert(
                'Password Reset Successfully!',
                '',
                [
                    {
                        text: 'Back to Login',
                        style: 'cancel',
                        onPress: () => updateResetPasswordSuccess(true),
                    }
                ], 
                {
                    cancelable: true,
                }
            )
        } else {
            Alert.alert(
                'Password Reset Error!',
                'Password could not be reset, please try again.',
                [
                    {
                        text: 'close',
                        style: 'cancel',
                    }
                ], 
                {
                    cancelable: true,
                }
            )
        }
    }

    if (resetPasswordSuccess) {
        return (
            <Redirect href="/pages/loginPage" />
        )
    } else {
        return (
            <View style={styles.pageContainer}>
                <TopButtonPlusHeader header="FoodBuster" transparentBg={true} destination="/pages/loginPage" replaceScreen={true} />
                <Text style={styles.pageHeading}>Reset Password</Text>
                <InputBoxWithOptionalTitle title="Email" placeholder="Email" updaterFn={updateEmail} />
                <InputBoxWithOptionalTitle title="New Password" placeholder="New Password" updaterFn={updateNewPassword} />
                <InputBoxWithOptionalTitle title="Confirm New Password" placeholder="Confirm New Password" updaterFn={updateConfirmNewPassword} />
                {passwordMismatch && <Text style={styles.errorMsg}>Passwords do not match</Text>}
                {hasEmptyFields && <Text style={styles.errorMsg}>Some fields are empty</Text>}
                {attemptedResetPassword && <Text style={styles.errorMsg}>Email is not tied to an account</Text>}
                <Button text='Reset Password' border='rounded' fn={handleResetPassword} />
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
    pageContainer: {
        paddingLeft: 20, 
        paddingRight: 20,
        justifyContent: 'center',
    },
    successScreen: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
    },
    errorMsg: {
        color: 'red', 
        textDecorationLine:'underline',
    }
})