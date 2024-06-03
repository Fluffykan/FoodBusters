import { useState } from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import ShopCondensedInfo from '../../components/ShopCondensedInfo';
import UserInfo from './components/userInfo';
import ProfileNavBar from './components/profileNavBar';
import Navbar from '@/components/Navbar';

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
        <View style={styles.container}>
            <UserInfo username='Dom Tor' email='domTor@gmail.com' />
            <ProfileNavBar setShowFavorites={setShowFavorites} setShowImages={setShowImages} setShowReviews={setShowReviews} />
            <ScrollView>
            { showFavorites && <ShopCondensedInfo /> }
            { showImages && <Text>Images</Text> }
            { showReviews && <Text>reviews</Text> }
            </ScrollView>
            <Navbar/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between', 
        height: '100%'
    }
});
