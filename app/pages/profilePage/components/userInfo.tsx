import { View, Image, Text, StyleSheet } from 'react-native';
import NavIconButtonWithOptionalText from '@/components/NavIconButtonWithOptionalText';
import Icon from 'react-native-vector-icons/AntDesign';
import LinkIconButtonWithOptionalText from '@/components/LinkIconButtonWithOptionalText';
type userInfoProps = {
    username:string;
    email: string;

}


export default function UserInfo({username, email}:userInfoProps) {
    return (
        <View style={styles.userPictureAndInfo}>
            <View style={styles.userProfilePictureContainer}>
                <Icon name='user' size={60} />
            </View>
            <View>
                <Text style={styles.usernameText}>{username}</Text>
                <Text style={styles.userEmailText}>{email}</Text>
                <NavIconButtonWithOptionalText 
                    iconName='setting' 
                    destination='/pages/profilePage/components/editProfilePage' 
                    replaceScreen={false} 
                    text='Edit Profile' 
                    flexDir='row' border={true}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    userPictureAndInfo: {
        flexDirection: 'row',
        paddingBottom: 10,
        flex: 1,
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