import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import PageBreakLine from "@/components/PageBreakLine";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import { MaterialIcons, FontAwesome, Entypo } from '@expo/vector-icons';  // Make sure to install @expo/vector-icons
import { MaterialCommunityIcons } from "@expo/vector-icons";
import HelpBar from "@/components/HelpBar";
import LinkIconButtonWithOptionalText from "@/components/LinkIconButtonWithOptionalText";
import PointShop from "./components/PointsShop";
import VoucherShop from "./components/VoucherShop";
import TopUp from "./components/Topup";
import axios from "axios";

export default function Wallet() {

    const [pointShopOpen, togglePointsShop] = useState(false);
    const handleOpenPointsShop = () => {
        togglePointsShop(true);
        toggleVoucherShop(false);
        toggleTopup(false);
        console.log('displaying Points Shop');
    }
    const [voucherShopOpen, toggleVoucherShop] = useState(false);
    const handleOpenVouchers = () => {
        togglePointsShop(false);
        toggleVoucherShop(true);
        toggleTopup(false);
        console.log('displaying Vouchers');
    }
    const [topupOpen, toggleTopup] = useState(false);
    const handleOpenTopup = () => {
        togglePointsShop(false);
        toggleVoucherShop(false);
        toggleTopup(true);
    }

    // Each user can have 2 additional fields: Money and Points
    // fetch using API
    const [loyaltyPoints, setLoyaltyPoints] = useState(0);
    const [foodbusterPay, setFoodbusterPay] = useState(0);
    const getPoints = async () => {
        const result = await axios.get('http://10.0.2.2:4200/getUserCreds');
        const usercreds = result.data;
        setLoyaltyPoints(usercreds[5]);
        setFoodbusterPay(usercreds[6]);
    }

    useEffect(() => {
        getPoints();
    }, [loyaltyPoints, foodbusterPay]);
    // TODO: fetch point shop and voucher shop contents

    const usePoints = "Use Points";
    const topUp = "Top Up";
    const useVouchers = "Voucher";
    const [closePopup, setClosePopup] = useState(false);
    // TODO: fetch random sentence from database
    const sentence = 'Start recommending your best dishes to earn loyalty points!';
    return (
        <View style={styles.container}>
            <HelpBar page='wallet' visibility={closePopup} changeVisibility={setClosePopup} />
            <Header header="My Wallet" />
            <PageBreakLine style='solid' />
            <View style={styles.content}>
                <View style={styles.boxContainer}>
                        <View style={styles.box}>
                            <Text style={styles.boxHeader}>FoodBuster Purse:</Text>
                            <Text style={styles.boxAmount}>${foodbusterPay}</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.boxHeader}>Loyalty Points:</Text>
                            <Text style={styles.boxAmount}>{loyaltyPoints}</Text>
                        </View>
                </View>
                <PageBreakLine style='solid' />
                <ScrollView>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.button} onPress={handleOpenTopup}>
                            <MaterialIcons name="attach-money" size={24} color="black" />
                            <Text style={styles.buttonText}>{topUp}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleOpenPointsShop}>
                            <FontAwesome name="star" size={24} color="black" />
                            <Text style={styles.buttonText}>{usePoints}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={handleOpenVouchers}>
                            <Entypo name="ticket" size={24} color="black" />
                            <Text style={styles.buttonText}>{useVouchers}</Text>
                        </TouchableOpacity>
                    </View>
                    {topupOpen && <TopUp />}
                    {pointShopOpen && <PointShop />}
                    {voucherShopOpen && <VoucherShop />}
                    <View style={styles.catContainer}>
                        <MaterialCommunityIcons name="cat" size={50} color="black" />
                        <View style={styles.speechBubble}>
                            <Text style={styles.speechTextBold}>What does Chase wish to say :</Text>
                            <Text style={styles.speechText}>{sentence}</Text>
                        </View>
                    </View>
                    {/* Add your other content components here */}
                    <Text />
                </ScrollView>
            </View>
            <LinkIconButtonWithOptionalText text='Help' iconColor='red' floating={true} fn={() => setClosePopup(!closePopup)} iconName='questioncircleo' iconSize={50} />
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