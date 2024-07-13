import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState } from "react";
import PageBreakLine from "@/components/PageBreakLine";
import LoyaltyPointsBar from "./components/loyaltyPointsBar";
import WalletNavbar from "./components/walletNavBar";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import { MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';  // Make sure to install @expo/vector-icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Wallet() {

    const [pointShopOpen, togglePointsShop] = useState(false);
    const handleOpenPointsShpo = () => {
        togglePointsShop(true);
        toggleVoucherShop(false);
        console.log('displaying Points Shop')
    }
    const [voucherShopOpen, toggleVoucherShop] = useState(true);
    const handleOpenVouchers = () => {
        togglePointsShop(false);
        toggleVoucherShop(true);
        console.log('displaying Vouchers')
    }

    // Each user can have 2 additional fields: Money and Points
    // fetch using API
    const loyaltyPoints = 555;
    const foodbusterPay = 1599.54;
    // TODO: fetch point shop and voucher shop contents

    const usePoints = "Use Points";
    const topUp = "Top Up";
    const useVouchers = "Voucher";
    // TODO: fetch random sentence from database
    const sentence = 'Start recommending your best dishes to earn loyalty points!';
    return (
        <View style={styles.container}>
            <Header header="My Wallet" />
            <PageBreakLine style='solid' />
            <View style={styles.content}>
                <View style={styles.boxContainer}>
                        <View style={styles.box}>
                            <Text style={styles.boxHeader}>FoodBuster Purse:</Text>
                            <Text style={styles.boxAmount}>${foodbusterPay.toFixed(2)}</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.boxHeader}>Loyalty Points:</Text>
                            <Text style={styles.boxAmount}>{loyaltyPoints}</Text>
                        </View>
                </View>
                <PageBreakLine style='solid' />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <MaterialIcons name="attach-money" size={24} color="black" />
                        <Text style={styles.buttonText}>{topUp}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <FontAwesome name="star" size={24} color="black" />
                        <Text style={styles.buttonText}>{usePoints}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Entypo name="ticket" size={24} color="black" />
                        <Text style={styles.buttonText}>{useVouchers}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.catContainer}>
                    <MaterialCommunityIcons name="cat" size={50} color="black" />
                    <View style={styles.speechBubble}>
                        <Text style={styles.speechTextBold}>What does Chase wish to say :</Text>
                        <Text style={styles.speechText}>{sentence}</Text>
                    </View>
                </View>
                {/* Add your other content components here */}
            </View>
            <Navbar/>
        </View>
        
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        justifyContent: 'space-between',
    },
    content: {
        flex: 1,
    },
    boxContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    box: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    boxHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    boxAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 15,
        marginHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        flex: 1,
        justifyContent: 'center',
        minWidth: 100,  // Minimum width to prevent text wrapping
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    catContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    speechBubble: {
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        maxWidth: '80%', // Adjust as needed
    },
    speechText: {
        fontSize: 14,
        color: '#000000',
    },
    speechTextBold: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000000',
    },
})