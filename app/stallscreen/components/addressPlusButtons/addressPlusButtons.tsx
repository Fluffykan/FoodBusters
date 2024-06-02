import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from "react-native";
import { useState } from "react";
import Icon from 'react-native-vector-icons/AntDesign';

export default function AddressPlusButtons() {

    const tempAddressName = "35 Selegie Road 188307 #01-06";
    const tempRatingName = "4.0 Stars";
    const tempFoodType = "Hotpot";
    const tempStatus = "Status: Open";

    const locationandInaccuraciesButtonandStatus = StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: 'space-between',
            alignItems: 'center',
            width: "100%"
        }
    });

    const addressRatingAndFoodTypeEdit = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'flex-start'
        }
    })

    const addressEdit = StyleSheet.create({
        container: {
            fontSize: 15
        }
    })

    const ratingsEdit = StyleSheet.create({
        container: {
            fontSize: 15
        }
    })

    const foodTypeEdit = StyleSheet.create({
        container: {
            fontSize: 15
        }
    })

    const statusEdit = StyleSheet.create({
        container: {
            height: 80,
            width: 100,
            color: "black",
            fontSize: 30
        }
    });

    const reportImageEdit = StyleSheet.create({
        container: {
            
            position: 'relative',
            right: 30,
            height: 55,
            width: 55
        }
    })

    const [reportingInaccuraciesButtonIsPressed, setreportingInaccuraciesButtonIsPressed] = useState(false)
    const togglereportInaccuraciesButton = () => {
        setreportingInaccuraciesButtonIsPressed(!reportingInaccuraciesButtonIsPressed)
        console.log("Reporting Inaccuracies")
    }

    return (
        <View style={locationandInaccuraciesButtonandStatus.container}>
            <View style={addressRatingAndFoodTypeEdit.container}>
                <Text style={addressEdit.container}>{tempAddressName}</Text>
                <Text style={ratingsEdit.container}>{tempRatingName}</Text>    
                <Text style={foodTypeEdit.container}>{tempFoodType}</Text>
            </View>
                <TouchableOpacity onPress={togglereportInaccuraciesButton}>
                    
                </TouchableOpacity>
                <Text style={statusEdit.container}>{tempStatus}</Text> 
        </View>
    )
}