import axios from 'axios';
import { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';


type profileNavBarProps = {
    toggleScreen: (x: number) => void;
}

export default function ProfileNavBar({toggleScreen}: profileNavBarProps) {
    const handleReviewClick = () => {
        toggleScreen(0);
    }
    const handleImagesClick = () => {
        toggleScreen(1);
    }
    const handleFavoritesClick = () => {
        toggleScreen(2);
    }
    
    return (
        <View style={navBarStyles.navBar}>
            <TouchableOpacity style={navBarStyles.navBarButton} onPress={handleReviewClick}>
                <Icon name='filetext1' size={25} />
            </TouchableOpacity>
            <TouchableOpacity style={navBarStyles.navBarButton} onPress={handleImagesClick}>
                <Icon name='picture' size={25} />
            </TouchableOpacity>
            <TouchableOpacity style={navBarStyles.navBarButton} onPress={handleFavoritesClick}>
                <Icon name='hearto' size={25} />
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