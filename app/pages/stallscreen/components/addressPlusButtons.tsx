import { StyleSheet, View, Text, } from "react-native";
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
    const storeRating = rating.toFixed(1); // Format the rating to one decimal place
    const storeFoodType = foodType;


    return (
        <View style={styles.container}>
            <View style={styles.shopInfoContainer}>
                <Text style={styles.shopInfo}>{storeAddress}</Text>
                <View style={styles.ratingAndStar}>
                    <Text style={styles.shopInfo}>{storeRating} / 5.0 </Text>
                    <Icon name="staro" size={20} color="black" />
                </View>
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
    ratingAndStar: {
        flexDirection: "row",
    },
    shopInfo: {
        fontSize: 15,
    },
    shopInfoContainer: {
        flex: 1,
        alignItems: 'flex-start'
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