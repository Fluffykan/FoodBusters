import { View, Text, StyleSheet } from 'react-native';
import { Link, Redirect, useRouter } from 'expo-router';
import { useState } from 'react';
import InputBoxWithOptionalTitle from '@/components/InputBoxWithTitle';
import Button from '@/components/Button';
import axios from 'axios';
import Header from '@/components/Header';

export default function LoginPage() {
    const [email, updateEmail] = useState('');
    const [password, updatePassword] = useState<String>('');
    const [passwordError, updatePasswordError] = useState(true);
    const [attemptedLogin, updateAttemptedLogin] = useState(false);
    const [userId, setUserId] = useState(null);
    const router = useRouter();

    const handleLogin = () => {
        if (!hasEmptyField) {
            updateAttemptedLogin(true);
            console.log(`login attempt: ${email} ${password}`);
            axios.post(`http://10.0.2.2:4200/login`, {email:email, password_hash:password})
                .then(response => { 
                    const status = response.status;
                    console.log("response status=" + status);
                    updatePasswordError(status != 200);
                    //updateAttemptedLogin(true);
                    if (status === 200) {
                        //setUserId(response.data.userId); // Set the userId upon successful login
                        router.push(`/pages/tempHomeScreen?email=${email}&password_hash=${password}`);
                    }
                })
                .catch(error => {
                    console.error(error);
                    console.log(error.request);
                })
        } else {
            console.log('some fields empty');
        }
    }

    const hasEmptyField = email == '' || password == '';

    if (!passwordError) {
        return <Redirect href='/pages/tempHomeScreen' />
    } else {
        return (
            <View style={styles.container}>
                <Header header='FoodBuster' transparentBg={true} />
                <InputBoxWithOptionalTitle placeholder='Email' updaterFn={updateEmail} />
                <InputBoxWithOptionalTitle placeholder='Password' updaterFn={updatePassword} />
                {hasEmptyField && <Text style={styles.errorMsg}>Some fields are empty</Text>}
                {passwordError && attemptedLogin && <Text style={styles.errorMsg}>Incorrect Email or Password</Text>}
                <Button text='Login' bgColor='blue' textColor='white' border='rounded' fn={handleLogin} />
                <Link replace href='/pages/resetPassword' style={styles.redirectButton}>
                    <Text style={styles.redirectButtonText}>Forgot Password</Text>
                </Link>
                <Link replace href='/pages/createAccount' style={styles.redirectButton}>
                    <Text style={styles.redirectButtonText}>Create Account</Text>
                </Link>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 20, 
        paddingRight: 20, 
        height: '100%', 
        justifyContent:'center'

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
    },
    errorMsg: {
        color: 'red', 
        textDecorationLine:'underline',
    }

})