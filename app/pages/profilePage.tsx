import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import ShopCondensedInfo from '../components/ShopCondensedInfo';

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
        <View>
            <View style={styles.userPictureAndInfo}>
                <View style={styles.userProfilePictureContainer}>
                    <Image source={require('../assets/profilePicturePlaceholder.png')} alt='profile picture' style={styles.userProfilePicture} />
                </View>
                <View>
                    <Text style={styles.usernameText}>{userId}</Text>
                    <Text style={styles.userEmailText}>{userEmail}</Text>
                    <TouchableOpacity style={styles.editUserProfileButton} onPress={handleEditProfileClick}>
                        <Text style={styles.editProfileText}>Edit Profile</Text>
                        <Image source={require('../assets/editProfileIcon.png')} style={{height: 25, width: 25}} />
                    </TouchableOpacity>
                </View>
            </View>
            <View>
                {ProfileNavBar(setShowReviews, setShowImages, setShowFavorites)}
            </View>
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

// NAV BAR UI
function ProfileNavBar(showReview:Function, showImages:Function, showFavorites:Function) {
    const handleReviewClick = () => {
        showReview(true);
        showImages(false);
        showFavorites(false);
        console.log('displaying Reviews')
    }
    const handleImagesClick = () => {
        showReview(false);
        showImages(true);
        showFavorites(false);
        console.log('displaying Images')
    }
    const handleFavoritesClick = () => {
        showReview(false);
        showImages(false);
        showFavorites(true);
        console.log('displaying Favorites')
    }
    
    return (
        <View style={navBarStyles.navBar}>
            <TouchableOpacity style={navBarStyles.navBarButton} onPress={handleReviewClick}>
                <Image source={require('../assets/reviewsIcon.png')} alt='My Reviews' style={navBarStyles.navBarIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={navBarStyles.navBarButton} onPress={handleImagesClick}>
                <Image source={require('../assets/camera.png')} alt='My Images' style={navBarStyles.navBarIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={navBarStyles.navBarButton} onPress={handleFavoritesClick}>
                <Image source={require('../assets/like.png')} alt='Favorites' style={navBarStyles.navBarIcon} />
            </TouchableOpacity>
        </View>  
    );
}

const navBarStyles = StyleSheet.create({
    navBar: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row', 
        justifyContent: 'space-between',
        borderWidth: 1,
        backgroundColor: 'rgb(222, 222, 222)',
    },
    navBarButton: {
        height: 25,
        width: '33%',
        alignItems: 'center',
    },
    navBarIcon: {
        flex: 1,
        resizeMode: 'contain',
    },
});