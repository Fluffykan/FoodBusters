import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from "react-native";
import { useState } from "react";
import Icon from 'react-native-vector-icons/AntDesign';

type storeInfo = {
    operating: boolean;
    rating: number;
    foodType: string;
    address: string;
}

export default function AddressPlusButtons({operating, rating, foodType, address}: storeInfo) {

    const [reportingInaccuraciesButtonIsPressed, setreportingInaccuraciesButtonIsPressed] = useState(false)
    const togglereportInaccuraciesButton = () => {
        setreportingInaccuraciesButtonIsPressed(!reportingInaccuraciesButtonIsPressed)
        console.log("Reporting Inaccuracies")
    }

    // TO BE FETCHED USING API
    const storeOpen = operating;
    const storeAddress = address;
    const storeRating = rating;
    const storeFoodType = foodType;


    return (
        <View style={styles.container}>
            <View style={styles.shopInfoContainer}>
                <Text style={styles.shopInfo}>{storeAddress}</Text>
                <Text style={styles.shopInfo}>{storeRating} / 5 Stars</Text>
                <Text style={styles.shopInfo}>{storeFoodType}</Text>
            </View>
            <View>
                {storeOpen && <Text style={styles.statusOpen}>Open</Text>}
                {!storeOpen && <Text style={styles.statusClose}>Closed</Text>}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%"
    },
    shopInfo: {
        fontSize: 15,
    },
    shopInfoContainer: {
        flex: 1,
        alignItems: 'flex-start'
    }, 
    statusText: {
        color: "black",
        fontSize: 30,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
    statusOpen: {
        color: "white",
        fontSize: 30,
        backgroundColor: 'green',
        textAlign: 'center',
        borderRadius: 10,
        paddingHorizontal: 10,
    },
    statusClose: {
        color: "white",
        fontSize: 30,
        backgroundColor: 'red',
        textAlign: 'center',
        borderRadius: 10,
        paddingHorizontal: 10,

    }
})