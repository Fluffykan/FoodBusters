import InputBoxWithOptionalTitle from "@/components/InputBoxWithTitle";
import Button from "@/components/Button";
import { View, StyleSheet, Text } from 'react-native';
import { useState } from "react";
import axios from 'axios';
import TopButtonPlusHeader from "@/components/TopButtonPlusHeader";
import NavIconButtonWithOptionalText from "@/components/NavIconButtonWithOptionalText";

export default function ResetPassword() {
    const [email, updateEmail] = useState('');
    const [newPassword, updateNewPassword] = useState('');
    const [confirmNewPassword, updateConfirmNewPassword] = useState('');
    const [resetPasswordSuccess, updateResetPasswordSuccess] = useState(false);
    const [attemptedResetPassword, updateAttempt] = useState(false);

    const passwordMismatch = newPassword != confirmNewPassword;
    const hasEmptyFields = email == "" || newPassword == "" || confirmNewPassword == "";

    const handleResetPassword = () => {
        console.log('resetting password');
        if (!(passwordMismatch || hasEmptyFields)) {
            axios.put("http://192.168.1.15:4200/resetPassword/", {password_hash:newPassword, email:email})
                .then(response => {
                    console.log('reset password success');
                    console.log(response.data["affectedRows"])
                    updateResetPasswordSuccess(response.data["affectedRows"] == 1);
                    updateAttempt(true);
                })
                .catch(error => {
                    console.error('error in resetting password', error);
                    updateAttempt(true);
                })
        } else {
            console.log('password mismatch');
        }
    }

    if (resetPasswordSuccess) {
        return (
            <View style={styles.successScreen}>
                <Text style={styles.pageHeading}>Reset Password Success!</Text>
                <NavIconButtonWithOptionalText iconName="enter" destination="/pages/loginPage" text="Back To Login" flexDir="row" border={true} replaceScreen={true} />
            </View>
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