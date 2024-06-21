import { StyleSheet, View, Text, ScrollView, TextInput } from "react-native";
import React, { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Icon from 'react-native-vector-icons/AntDesign';
import Slider from '@react-native-community/slider'; //npm install @react-native-community/slider <= Make sure to run this first
import Button from "@/components/Button";


export default function WriteReviewPage() {

    /*const storeName = "La Jiang Shan";
    const storeAddress = "@ Selegie Road";*/
    
    const { stallName, stallAddress } = useLocalSearchParams();
    const [rating, setRating] = useState(0);

    const formatRating = (value: number) => {
        return `${value.toFixed(1)} / 5.0`;
    };


    const shareYourReview = "Share Your Review";

    const shareYourReviewFunc = () => {
        console.log("Sharing Your Photos...");
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.storeInfo}>
                <Text style={styles.storeName}>{stallName}</Text>
                <Text style={styles.storeAddress}>{stallAddress}</Text>
            </View>
            <View style={styles.ratingContainer}>
                <View style={styles.rating}>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Icon
                            key={i}
                            name="staro"
                            size={40}
                            color={i <= rating ? "orange" : "gray"}
                            
                        />
                    ))}
                </View>
                <Text style={styles.currentRating}>Rating: {formatRating(rating)}</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={5}
                    step={0.1}
                    value={rating}
                    onValueChange={setRating}
                    minimumTrackTintColor="orange"
                    maximumTrackTintColor="gray"
                />
                <View style={styles.textInputContainer}>
                    
                    <ScrollView style={styles.textInputScroll}>
                        <TextInput
                            multiline
                            numberOfLines={4}
                            placeholder="Write your review here..."
                            style={styles.textInput}
                        />
                    </ScrollView>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                text={shareYourReview}
                textColor={'Brown'}
                bgColor={'Grey'}
                border={"rounded"}
                underline={false}
                fn={shareYourReviewFunc}
                ></Button>
            </View>
            
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between', 
    },
    storeInfo: {
        marginLeft: '25%',
        marginBottom: 16,
    },
    storeName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    storeAddress: {
        fontSize: 14,
        color: 'gray',
    },
    rating: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',  // Ensure the rating container takes up the full width
    },
    padding: {
        paddingHorizontal: 10
    },
    ratingContainer: {
        alignItems: 'center',
        width: '100%',  // Ensure the rating container takes up the full width
    },
    slider: {
        width: '100%',
        height: 40,
        marginTop: 16,
        alignSelf: 'center',  // Align the slider to the center horizontally
    },
    currentRating: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textInputContainer: {
        width: '100%',
        marginTop: 16,
        paddingHorizontal: 10,
    },
    textInputScroll: {
        maxHeight: 200,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    textInput: {
        fontSize: 16,
    },
    buttonContainer: {
        alignSelf: 'center',
        marginBottom: 16,
    },
})
