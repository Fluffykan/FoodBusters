import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function ShopCondensedInfo() {
    // TODO: 
    // CREATE LOGIC TO PULL INFORMATION FROM BACKEND
    const storeName = 'Ah Huat Coffee';
    const storeDist = '300m';
    const storeAddress = '1 Novena Express';
    const storeRating = '3.5';
    const storeStatus = 'Open till 10pm';
    const storeClassification = 'Cafe, Coffee, Toast';

    // TODO: 
    // CREATE LOGIC TO REDIRECT TO STORE PAGE
    const handleStoreClick = () => {
        console.log('redirect to store page');
    }

    return (
        <TouchableOpacity style={styles.shopButton} onPress={handleStoreClick}>
            <View style={styles.storeImageContainer}>
            <Image source={require('../assets/plateAndCutlery.png')} style={styles.storeImage} />
            </View>
            <View>
                <View style={styles.flexRowContainer}>
                <Text style={styles.informationText}>{storeName}</Text>
                <Text style={styles.storeDistance}>{storeDist}</Text>
                </View>
                <Text style={styles.informationText}>{storeAddress}</Text>
                <View style={styles.flexRowContainer}>
                <Text style={styles.informationText}>{storeRating}</Text>
                <Image source={require('../assets/star.png')} style={{height: 13, width: 13}} />
                </View>
                <Text style={styles.informationText}>{storeStatus}</Text>
                <Text style={styles.informationText}>{storeClassification}</Text>

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    shopButton: {
        flexDirection: 'row',
        borderWidth: 1,
    },
    storeImage: {
        resizeMode: 'stretch',
        flex: 1,
    },
    storeImageContainer: {
        width: '30%',
        height: '100%',
        borderWidth: 1,
        backgroundColor: 'black',

    },
    informationText: {
        paddingLeft: 10,
        paddingRight: 5,
    },
    storeDistance: {
        backgroundColor: 'blue',
        borderRadius: 5,
        color: 'white',
        alignContent: 'center',

        paddingRight: 5,
        paddingLeft: 5,
    },
    flexRowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})