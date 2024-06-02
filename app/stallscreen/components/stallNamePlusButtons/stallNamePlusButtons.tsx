import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from "react-native";
import { useState } from "react";
import Icon from 'react-native-vector-icons/AntDesign';

export default function StallNamePlusButtons() {

    const tempStallName = "La Jiang Shan";

    const storeNameandWebsiteButtonandReviewButton = StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: 'center',
            width: "100%"
        }
    });

    const storeNameEdit = StyleSheet.create({
        container: {
            flex: 1,
            fontSize: 35,
            alignItems: 'flex-start'
        }
    })

    const websiteButtonEdit = StyleSheet.create({
        container: {
            
            position: 'relative',
            right: 30,
            height: 50,
            width: 50,
        }
    })

    const reviewButtonEdit = StyleSheet.create({
        container: {
            borderWidth: 2,
            borderRadius: 8,
            position: 'relative',
            height:50, 
            width:50
        }
    })

    const additionalPadding = StyleSheet.create({
        container: {
            paddingHorizontal: 15,
        }
    })

    const [writeReviewButtonIsPressed, setwriteReviewButtonIsPressed] = useState(false)
    const toggleReviewButton = () => {
        setwriteReviewButtonIsPressed(!writeReviewButtonIsPressed)
        console.log("Writing Your Review")
    }

    const [visitWebsiteButtonIsPressed, setvisitWebsiteButtonIsPressed] = useState(false)
    const togglevisitWebsiteButton = () => {
        setvisitWebsiteButtonIsPressed(!visitWebsiteButtonIsPressed)
        console.log("Entering Stall Website")
    }

    return (
        <View style={storeNameandWebsiteButtonandReviewButton.container}>

            <Text style={storeNameEdit.container}>{tempStallName}</Text>
            <View>
                <TouchableOpacity onPress={togglevisitWebsiteButton}>
                    <Icon name="earth" size={50} color="black" />
                </TouchableOpacity>
                <Text>Website</Text>
            </View>
            

            <View style={additionalPadding.container}></View>

            <View>
                <TouchableOpacity onPress={toggleReviewButton}>
                    <Icon name="message1" size={50} color="black" />
                </TouchableOpacity>
                <Text>Review</Text>
            </View>
           

        </View>
    )
}