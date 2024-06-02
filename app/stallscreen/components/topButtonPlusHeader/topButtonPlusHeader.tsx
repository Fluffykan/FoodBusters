import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from "react-native";
import { useState } from "react";
import Icon from 'react-native-vector-icons/AntDesign';

export default function TopButtonPlusHeader() {

    const foodBusterHeader = StyleSheet.create({
        container: {
            flex: 1,
            width: "100%",
            textAlign: 'center',
            justifyContent: 'center',
            fontWeight: '900',
            fontSize: 35
        }
    });

    const goBackandFoodBusterHeader = StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: 'center',
            width: "100%"
        }
    });

    const returnButtonIconEdit = StyleSheet.create({
        container: {
            height: 50,
            width: 50,
            alignItems: 'flex-start' 
        }
    })

    const [returnButtonIsPressed, setreturnButtonIsPressed] = useState(false)
    const toggleReturnButton = () => {
        setreturnButtonIsPressed(!returnButtonIsPressed);
        console.log("Redirecting to Previous Page...");
    } 

    return (
        <View style={goBackandFoodBusterHeader.container}>
            <TouchableOpacity onPress={toggleReturnButton}>
            <Icon name="doubleleft" size={50} color="black" />
                    
            </TouchableOpacity>
            <Text style={foodBusterHeader.container}>FoodBuster</Text>  
        </View>
    )
}