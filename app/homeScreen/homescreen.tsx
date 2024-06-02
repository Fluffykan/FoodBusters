import { StyleSheet, View, Text, Image, Button, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';


import ShopCondensedInfo from "../stallscreen/components/shopCondensed/shopCondensedInfo";

export default function HomeScreen() {

    const overallStyle = StyleSheet.create({
        container: {
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1, 
            padding: 0,
            paddingHorizontal: 20
        }
    });

    const spaceBetweenOnly = StyleSheet.create({
        container: {
            width: "100%",
            flexDirection: 'column',
            justifyContent: 'space-between'
        }
    })

    const goBackandMyHomeHeader = StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: 'center',
            width: "100%"
        }
    });

    const homeHeader = StyleSheet.create({
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

    const bottomButtons = StyleSheet.create({
        container: {
            bottom: 0,
            position: 'absolute',
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

    const horizontalline = StyleSheet.create({
        container: {
            width: '100%',
            height: 3,
            backgroundColor: 'black',
            marginVertical: 10,
        }
    })

    const filterandSearchIconEdit = StyleSheet.create({
        container: {
            borderWidth: 2,
            borderRadius: 8,
            justifyContent: "space-between",
            flexDirection: "row",
            width: "90%",
            alignItems: 'center',
        }
    })

    const filterTextEdit = StyleSheet.create({
        container: {
            alignItems: 'center',
            fontSize: 25,
            position: 'relative',
            justifyContent: 'center',
        }
    })

    const filterComponent = StyleSheet.create({
        container: {
            flexDirection: "row",
        }
    })

    const shiftToBottom = StyleSheet.create({
        container: {
            position: 'absolute',
            bottom: 0,
        }
    })

    const verticalPaddingonly = StyleSheet.create({
        container: {
            paddingVertical: 10,
        }
    })

    const bottomLine = StyleSheet.create({
        container: {
            position: 'absolute',
            bottom: 65,
            width: "100%",
            height: 3,
            backgroundColor: 'black',
            marginVertical: 10,
        }
    })
    
    const [homeButtonIsPressed, sethomeButtonIsPressed] = useState(false)
    const toggleHomeButton = () => {
        sethomeButtonIsPressed(!homeButtonIsPressed);
        console.log("Redirecting to HomePage...");
    }

    const [walletButtonIsPressed, setwalletButtonIsPressed] = useState(false)
    const toggleMyWalletButton = () => {
        setwalletButtonIsPressed(!walletButtonIsPressed);
        console.log("Redirecting to My Wallet Page...")
    }

    const [FOTDButtonIsPressed, setFOTDButtonIsPressed] = useState(false)
    const toggleFOTDButton = () => {
        setFOTDButtonIsPressed(!FOTDButtonIsPressed);
        console.log("Redirecting to FOTD Page");
    }

    const [profileButtonIsPressed, setprofileButtonIsPressed] = useState(false)
    const toggleProfileButton = () => {
        setprofileButtonIsPressed(!profileButtonIsPressed)
        console.log("Redirecting to Profile Page...")
    }

    const [returnButtonIsPressed, setreturnButtonIsPressed] = useState(false)
    const toggleReturnButton = () => {
        setreturnButtonIsPressed(!returnButtonIsPressed);
        console.log("Redirecting to Previous Page...");
    }

    const [writeReviewButtonIsPressed, setwriteReviewButtonIsPressed] = useState(false)
    const toggleReviewButton = () => {
        setwriteReviewButtonIsPressed(!writeReviewButtonIsPressed)
        console.log("Writing Your Review")
    }

    return (

        <View style={overallStyle.container}>
            
            <View style={goBackandMyHomeHeader.container}>
                <TouchableOpacity onPress={toggleReturnButton}>
                    <Icon name="doubleleft" size={50} color="black" />
                </TouchableOpacity>
                <Text style={homeHeader.container}>Home</Text>  
            </View>
        
            <View style={horizontalline.container}></View>

            <View style={filterComponent.container}>
                <TouchableOpacity onPress={toggleReviewButton}>
                    <View style={filterandSearchIconEdit.container}>
                        <Text style={filterTextEdit.container}>Filter</Text>
                        <Icon name="search1" size={30} color="black" />
                    </View>
                </TouchableOpacity>
                <Icon name="filter" size={30} color="black" />
            </View>

            <View>
                <View style={verticalPaddingonly.container}></View>
                
                <ShopCondensedInfo></ShopCondensedInfo>
                <ShopCondensedInfo></ShopCondensedInfo>
                <ShopCondensedInfo></ShopCondensedInfo>
                <ShopCondensedInfo></ShopCondensedInfo>
                <ShopCondensedInfo></ShopCondensedInfo>
                <ShopCondensedInfo></ShopCondensedInfo>
                
                
            </View>
           
            <View style={bottomLine.container}></View>

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