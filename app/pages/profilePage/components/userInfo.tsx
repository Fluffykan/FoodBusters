import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Button from '@/components/Button';

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
                <Link href='/pages/workInProgress' style={styles.editProfileContainer}>
                    <Text style={styles.editProfileText}>Edit Profile</Text>
                    <Image source={require('@/app/assets/editProfileIcon.png')} style={{height: 20, width: 20}} />
                </Link>
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
    editUserProfileButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
    },
    editProfileText: {
        fontSize: 15,
        paddingRight: 10,
        paddingLeft: 5,
        textDecorationLine: 'underline',
    },
    editProfileContainer: {
        borderRadius: 10, 
        borderWidth: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    }
});