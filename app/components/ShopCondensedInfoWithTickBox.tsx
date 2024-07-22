import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

type ShopCondensedInfoProps = {
    id: number;
    storeName: string;
    storeAddress: string;
    storeStatus: string;
    storeClassification: string;
    storeRating: string;
    storeDist: string;
    onSelectionChange: (id: number, isSelected: boolean) => void;
};

export default function ShopCondensedInfoWithTickBox(props: ShopCondensedInfoProps) {

    const { id, storeName, storeDist, storeAddress, storeRating, storeStatus, storeClassification, onSelectionChange } = props;

    // State to manage the green outline
    const [isSelected, setIsSelected] = useState(false);

    // Handle the click event to toggle the green outline
    const handlePress = () => {
        const newSelectedState = !isSelected;
        setIsSelected(!isSelected);
        onSelectionChange(id, newSelectedState);
    };

    // Convert storeRating and storeDist to numbers
    const rating = parseFloat(storeRating);
    const distance = parseFloat(storeDist);

    // Define the container style with conditional green outline
    const containerStyle = [
        styles.overallContainer,
        isSelected && styles.selectedContainer
    ];

    return (
        <TouchableOpacity onPress={handlePress} style={containerStyle}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.storeImageContainer}>
                    <Image
                        source={require('../assets/plateAndCutlery.png')}
                        style={styles.storeImage}
                        resizeMode="cover" // Adjust resizeMode as needed
                    />
                </View>
                <View style={{ flex: 1, marginLeft: 10 }}>
                    <View style={styles.flexRowContainer}>
                        <Text style={styles.informationText}>{storeName}</Text>
                        <Text style={styles.storeDistance}>{storeDist}</Text>
                    </View>
                    <Text style={styles.informationText}>{storeAddress}</Text>
                    <View style={styles.flexRowContainer}>
                        <Text style={styles.informationText}>{storeRating}</Text>
                        <Image source={require('../assets/star.png')} style={styles.starImage} />
                    </View>
                    <Text style={styles.informationText}>{storeStatus}</Text>
                    <Text style={styles.informationText}>{storeClassification}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    storeImageContainer: {
        width: 80, // Adjust width as needed
        height: 80, // Adjust height as needed
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'black',
    },
    storeImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Adjust resizeMode as needed
    },
    informationText: {
        paddingLeft: 10,
        paddingRight: 5,
    },
    storeDistance: {
        backgroundColor: 'blue',
        borderRadius: 5,
        color: 'white',
        paddingHorizontal: 5,
        marginLeft: 5,
    },
    flexRowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    overallContainer: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginVertical: 5,
    },
    selectedContainer: {
        borderColor: 'green',
        borderWidth: 2,
    },
    starImage: {
        height: 13,
        width: 13,
        marginLeft: 5,
    },
});
