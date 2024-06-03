import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Button from '@/components/Button';
import NavIconButtonWithOptionalText from '@/components/NavIconButtonWithOptionalText';

type userInfoProps = {
    username:string;
    email: string;

}


export default function UserInfo({username, email}:userInfoProps) {
    return (
        <View style={styles.userPictureAndInfo}>
            <View style={styles.userProfilePictureContainer}>
                <Image source={require('@/app/assets/profilePicturePlaceholder.png')} alt='profile picture' style={styles.userProfilePicture} />
            </View>
            <View>
                <Text style={styles.usernameText}>{username}</Text>
                <Text style={styles.userEmailText}>{email}</Text>
                <NavIconButtonWithOptionalText iconName='setting' destination='/pages/workInProgress' replaceScreen={false} text='Edit Profile' flexDir='row' border={true} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    userPictureAndInfo: {
        flexDirection: 'row',
        borderColor: 'black',
        borderWidth: 1,
        paddingBottom: 10,
    },
    userProfilePicture: {
        height: 70,
        width: 70,
        borderRadius: 35,
    },
    userProfilePictureContainer: {
        justifyContent: 'flex-start',
        paddingTop: 10,
        paddingRight: 10,
    },
    usernameText: {
        fontSize: 35,
    },
    userEmailText: {
        fontSize: 15,
        paddingBottom: 15,
    },
});