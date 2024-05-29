import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import ShopCondensedInfo from '../../components/ShopCondensedInfo';
import UserInfo from './components/userInfo';
import ProfileNavBar from './components/profileNavBar';

export default function ProfilePage() {
    // TODO: 
    // SET LOGIC FOR PULLING USER INFORMATION FROM DATABASE
    const userId = 'Dom Tor';
    const userEmail = 'domTor@gmail.com';

    // TODO:
    // SET LOGIC FOR SWITCHING CONTENT TO BE DISPLAYED BETWEEN "REVIEWS", "IMAGES" AND "FAVORITES"
    const [showReviews, setShowReviews] = useState(true);
    const [showImages, setShowImages] = useState(false);
    const [showFavorites, setShowFavorites] = useState(false);


    // TODO: 
    // HANDLE REDIRECTION TO EDIT PROFILE PAGE
    const handleEditProfileClick = () => {
        console.log('redirect to edit profile');
    }

    // TODO: 
    // CREATE UI FOR REVIEWS AND IMAGES PAGE

    return (
        <View style={{justifyContent: 'space-between', height: '100%'}}>
            <UserInfo username='Dom Tor' email='domTor@gmail.com' />
            <ProfileNavBar setShowFavorites={setShowFavorites} setShowImages={setShowImages} setShowReviews={setShowReviews} />
            <ScrollView>
            { showFavorites && <ShopCondensedInfo /> }
            </ScrollView>
        </View>
    );
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
});
