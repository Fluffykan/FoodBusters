import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';


export default function Wallet() {

    const pointsTemp = 555;

    const overallStyle = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center'
        }
    })

    const myWalletHeader = StyleSheet.create({
        container: {
            flex: 1,
            width: "100%",
            textAlign: 'center',
            justifyContent: 'center',
            fontWeight: '900',
            color: 'black',
            fontSize: 35
        }
    });

    const goBackandMyWalletHeader = StyleSheet.create({
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
            alignItems: 'flex-start', 
        }
    })

    const loyaltyTextAndImage = StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: 'center',
        }
    })

    const crownImage = StyleSheet.create({
        container: {
            height: 50,
            width: 50,
            paddingHorizontal: 30
        }
    })

    const loyaltyPointsText = StyleSheet.create({
        container: {
            
            fontSize: 30,
            fontFamily: 'sans-serif',
            color: 'black',
            paddingHorizontal: 8,
        }
    })

    const pointsText = StyleSheet.create({
        container: {
            borderWidth: 3.5,
            borderRadius: 20,
            fontSize: 30,
            position: 'relative',
            paddingHorizontal: 35
        }
    })

    const horizontalline = StyleSheet.create({
        container: {
            width: '100%',
            height: 3,
            backgroundColor: 'black',
            marginVertical: 10,
        }
    })

    const usePointsText = StyleSheet.create({
        container: {
            fontSize: 15,
        }
    })

    const useVouchersText = StyleSheet.create({
        container: {
            fontSize: 12,
        }
    })

    const usePointsandIcon = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
        }
    })

    const vouchersandIcon = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: 'center',
        }
    })

    const additionalPadding = StyleSheet.create({
        container: {
            paddingHorizontal: 15,
        }
    })

    const bottomtwoButtons = StyleSheet.create({
        container: {
            flexDirection: "row",
            justifyContent: 'space-between',
            width: "100%",
            alignItems: 'center'
        }
    })

    const verticalLine = StyleSheet.create({
        container: {
            width: 1,
            height: "100%",
            backgroundColor: "black",
            
        }
    })

    const bottomButtons = StyleSheet.create({
        container: {
            position: 'absolute',
            bottom: 0,
            paddingHorizontal: 50,
            marginHorizontal: 50,
            flexDirection: "row",
            justifyContent: 'space-between',
            width: "100%"
        }
    });

    const homeTextEdit = StyleSheet.create({
        container: {
            fontSize: 18
        }
    })

    const myWalletTextEdit = StyleSheet.create({
        container: {
            fontSize: 18
        }
    })

    const foodOfTheDayTextEdit = StyleSheet.create({
        container: {
            fontSize: 18
        }
    })

    const profileTextEdit = StyleSheet.create({
        container: {
            fontSize: 18
        }
    })

    

    const [returnButtonIsPressed, setreturnButtonIsPressed] = useState(false)
    const toggleReturnButton = () => {
        setreturnButtonIsPressed(!returnButtonIsPressed);
        console.log("Redirecting to Previous Page...");
    }

    const [usePointsButtonIsPressed, setusePointsButtonIsPressed] = useState(false)
    const toggleusePointsButton = () => {
        setusePointsButtonIsPressed(!usePointsButtonIsPressed)
        console.log("Using Points...");
    }

    const [profileButtonIsPressed, setprofileButtonIsPressed] = useState(false)
    const toggleProfileButton = () => {
        setprofileButtonIsPressed(!profileButtonIsPressed)
        console.log("Redirecting to Profile Page...")
    }

    return (
        <View style={overallStyle.container}>
            <View style={goBackandMyWalletHeader.container}>
                <TouchableOpacity onPress={toggleReturnButton}>
                    <Icon name="doubleleft" size={50} color="black" />
                </TouchableOpacity>
                <Text style={myWalletHeader.container}>My Wallet</Text>  
            </View>

            <View style={horizontalline.container}></View>

            <View style={loyaltyTextAndImage.container}>
                <Text style={loyaltyPointsText.container}>Loyalty Points</Text>
                <Icon name="gift" size={50} color="black" />
                <Text style={pointsText.container}>{pointsTemp}</Text>
            </View>

            <View style={horizontalline.container}></View>

            <View style={bottomtwoButtons.container}>
                <View style={usePointsandIcon.container}>
                    <TouchableOpacity>
                        <Icon name="staro" size={50} color="black" />
                    </TouchableOpacity>
                    <View style={additionalPadding.container}></View>
                    <Text style={usePointsText.container} onPress={toggleusePointsButton}>Points</Text>
                </View>
                <View style={verticalLine.container}></View>
                <View style={vouchersandIcon.container}>
                    <TouchableOpacity>
                        <Icon name="book" size={50} color="black" />
                    </TouchableOpacity>
                    <View style={additionalPadding.container}></View>
                    <Text style={useVouchersText.container}>Vouchers</Text>
                </View>
            </View>

            <View style={horizontalline.container}></View>

            <View style={bottomButtons.container}> 
                            
                        
                <View>
                    <Link href={"homeScreen/homescreen"}>
                        <Icon name="home" size={50} color="black" />
                    </Link>
                    <Text style={homeTextEdit.container}>Home</Text>
                </View>
                    
                <View>
                    <Link href="walletScreen/wallet">
                        <Icon name="wallet" size={50} color="black" />
                    </Link>
                    <Text style={myWalletTextEdit.container}>Wallet</Text>
                </View>

                <View>
                    <Link href={"foodOfTheDayScreen/foodOfTheDay"}>
                        <Icon name="star" size={50} color="black" />
                    </Link>
                    <Text style={foodOfTheDayTextEdit.container}>FOTD</Text>
                </View>

                <TouchableOpacity onPress={toggleProfileButton}>
                    <Icon name="profile" size={50} color="black" />
                    <Text style={profileTextEdit.container}>Profile</Text> 
                </TouchableOpacity>

            </View>

        </View>
        
    )
}