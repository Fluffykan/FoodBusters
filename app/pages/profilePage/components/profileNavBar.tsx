import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

type profileNavBarProps = {
    setShowImages: (b:boolean) => void;
    setShowFavorites: (b:boolean) => void;
    setShowReviews: (b:boolean) => void;
}

export default function ProfileNavBar({setShowImages, setShowReviews, setShowFavorites}: profileNavBarProps) {
    const handleReviewClick = () => {
        setShowReviews(true);
        setShowImages(false);
        setShowFavorites(false);
        console.log('displaying Reviews')
    }
    const handleImagesClick = () => {
        setShowReviews(false);
        setShowImages(true);
        setShowFavorites(false);
        console.log('displaying Images')
    }
    const handleFavoritesClick = () => {
        setShowReviews(false);
        setShowImages(false);
        setShowFavorites(true);
        console.log('displaying Favorites')
    }
    
    return (
        <View style={navBarStyles.navBar}>
            <TouchableOpacity style={navBarStyles.navBarButton} onPress={handleReviewClick}>
                <Image source={require('@/app/assets/reviewsIcon.png')} alt='My Reviews' style={navBarStyles.navBarIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={navBarStyles.navBarButton} onPress={handleImagesClick}>
                <Image source={require('@/app/assets/camera.png')} alt='My Images' style={navBarStyles.navBarIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={navBarStyles.navBarButton} onPress={handleFavoritesClick}>
                <Image source={require('@/app/assets/like.png')} alt='Favorites' style={navBarStyles.navBarIcon} />
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