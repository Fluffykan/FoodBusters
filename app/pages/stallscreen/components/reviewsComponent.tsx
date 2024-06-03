import { StyleSheet, View, Text, Image, Button, TouchableOpacity, Pressable } from "react-native";
import { useState } from "react";
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';

export default function ReviewsComponent() {

    const tempNameAndRating = "By: DomTor    Rating: 4.5" 
    const tempReview = "Review: Amazing food with great service here..."

    const overallStyle = StyleSheet.create({
        container: {
            borderRadius: 10,
            borderWidth: 2,
            flexDirection: "row"
        }
    })    

    const nameAndStars = StyleSheet.create({
        container: {
            flexDirection: "row",
        }
    })

    const arrowDown = StyleSheet.create({
        container: {
            alignSelf: 'center',
        }
    })

    const profileIcon = StyleSheet.create({
        container: {
            paddingHorizontal: 10,
        }
    })

    const [readMoreButtonIsPressed, setReadMoreButton] = useState(false)
    const toggleReadMoreButton = () => {
        setReadMoreButton(!readMoreButtonIsPressed)
        console.log("Extending Review...")
    }

    return (
        <View style={overallStyle.container}>
            <View style={profileIcon.container}>
                <Icon name="user" size={50} color="black" />
            </View>
            <View>
                <View style={nameAndStars.container}>
                    <Text>{tempNameAndRating}</Text>
                    <Icon name="staro" size={15} color="black" />
                </View>
                
                <Text>{tempReview}</Text>
                <View style={arrowDown.container}>
                    <TouchableOpacity onPress={toggleReadMoreButton}>
                        <Icon name="down" size={15} color="black" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}