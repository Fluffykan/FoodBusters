import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import Icon from 'react-native-vector-icons/AntDesign';

type ReviewsComponentProps = {
    userID: string;
    userReview: string;
    userRating: string;
};

export default function ReviewsComponent({ userID, userReview, userRating }: ReviewsComponentProps) {

    const name = "DomTor";
    const rating = "4.5";
    const tempReview = "Review: Amazing food with great service here..."

    /*
    // ReadMore functionality is removed, can add back if time and skill permits in the future

    const [readMoreButtonIsPressed, setReadMoreButton] = useState(false)
    const toggleReadMoreButton = () => {
        setReadMoreButton(!readMoreButtonIsPressed)
        console.log("Extending Review...")
    }
    */
   
    // Truncate the review since it is too long. Shows only the first 5 words of the review padded by "..." at the end
    const truncateReview = (review: string, wordLimit: number) => {
        const words = review.split(" ");
        if (words.length <= wordLimit) {
            return review; // Return the full review if it's less than or equal to the word limit
        }
        return words.slice(0, wordLimit).join(" ") + "...";
    };


    return (
        <View style={styles.container}>
            <Icon name="user" size={50} color="black" />
            <View>
                <View style={styles.usernameAndRating}>
                    <Text>By: {userID}</Text>
                    <View style={styles.padding}></View>
                    <View style={styles.rating}>
                        <Text>Rating: {userRating}</Text>
                        <Icon name="staro" size={15} color="black" />
                        <Text> / 5.0</Text>
                        <Icon name="staro" size={15} color="black" />
                    </View>
                </View>
                
                <Text>{truncateReview(userReview, 7)}</Text>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderWidth: 2,
        flexDirection: "row",
        paddingHorizontal: 5,
    },
    usernameAndRating: {
        justifyContent: "space-between",
        flexDirection: "row",
    },
    rating: {
        flexDirection: "row",
        justifyContent: "center",
    },
    padding: {
        paddingHorizontal: 10,
    }
})