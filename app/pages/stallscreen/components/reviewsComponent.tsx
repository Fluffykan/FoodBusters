import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import Icon from 'react-native-vector-icons/AntDesign';

export default function ReviewsComponent() {

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

    return (
        <View style={styles.container}>
            <Icon name="user" size={50} color="black" />
            <View>
                <View style={styles.usernameAndRating}>
                    <Text>By: {name}</Text>
                    <View style={styles.rating}>
                        <Text>Rating: {rating}</Text>
                        <Icon name="staro" size={15} color="black" />
                        <Text> / 5</Text>
                        <Icon name="staro" size={15} color="black" />
                    </View>
                </View>
                
                <Text>{tempReview}</Text>

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
    }
})