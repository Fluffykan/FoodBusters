import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useState } from "react";

import PageBreakLine from "@/components/PageBreakLine";
import LoyaltyPointsBar from "./components/loyaltyPointsBar";
import WalletNavbar from "./components/walletNavBar";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";

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

    // fetch using API
    const loyaltyPoints = 555;
    // TODO: fetch point shop and voucher shop contents

    return (
        <View style={styles.container}>
            <Header header="My Wallet" />
            <PageBreakLine style='solid' />
            <LoyaltyPointsBar points={loyaltyPoints} />
            <PageBreakLine style='solid' />
            <WalletNavbar openPointsShop={handleOpenPointsShpo} openVouchers={handleOpenVouchers} />
            <ScrollView>
                {voucherShopOpen && <Text>Voucher Shop</Text>}
                {pointShopOpen && <Text>Point Shop</Text>}
            </ScrollView>
            <Navbar/>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
    },
})