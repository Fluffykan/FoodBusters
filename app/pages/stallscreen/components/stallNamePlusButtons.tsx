import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from "react-native";
import { useState } from "react";
import Icon from 'react-native-vector-icons/AntDesign';
import LinkIconButtonWithOptionalText from "@/components/LinkIconButtonWithOptionalText";
import NavIconButtonWithOptionalText from "@/components/NavIconButtonWithOptionalText";

type StallNamePlusButtonsProps = {
    restaurantID: number,
    stallName: string;
    stallAddress: string;
}

export default function StallNamePlusButtons({stallName, stallAddress, restaurantID}: StallNamePlusButtonsProps) {

    const [visitWebsiteButtonIsPressed, setvisitWebsiteButtonIsPressed] = useState(false)
    const togglevisitWebsiteButton = () => {
        setvisitWebsiteButtonIsPressed(!visitWebsiteButtonIsPressed)
        console.log("Entering Stall Website")
    }

    const reviewDestination = `/pages/writeReviewPage?stallName=${encodeURIComponent(stallName)}&stallAddress=${encodeURIComponent(stallAddress)}&restaurantID=${restaurantID}`;

    return (
        <View style={styles.container}>
            <Text style={styles.stallName}>{stallName}</Text>
            <LinkIconButtonWithOptionalText iconName="earth" text="Website" fn={togglevisitWebsiteButton}/>
            <NavIconButtonWithOptionalText iconName="message1" text="Review" replaceScreen={false} destination={reviewDestination} />
        </View>
    )
}

// Initial destination
// destination='/pages/writeReviewPage'

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%"
    },
    stallName: {
        flex: 1,
        fontSize: 35,
        alignItems: 'flex-start'
    },

})