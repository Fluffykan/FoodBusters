import VerticalLine from '@/components/VerticalLine';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

type walletNavbarProps = {
    openPointsShop: () => void;
    openVouchers: () => void;
}

export default function WalletNavbar({openPointsShop, openVouchers}: walletNavbarProps) {

    return (
        <View style={navBarStyles.navBar}>
            <TouchableOpacity style={navBarStyles.navBarButton} onPress={openPointsShop}>
                <Icon name="staro" size={50} color='black' />
            </TouchableOpacity>
            <VerticalLine />
            <TouchableOpacity style={navBarStyles.navBarButton} onPress={openVouchers}>
                <Icon name="book" size={50} color='black' />
            </TouchableOpacity>
        </View>  
    );
}

const navBarStyles = StyleSheet.create({
    navBar: {
        paddingVertical: 10, 
        paddingHorizontal: '20%',
        flexDirection: 'row', 
        width: '100%',
        justifyContent: 'space-between',
        borderWidth: 2,
    },
    navBarButton: {
        alignItems: 'center',
    },
    navBarIcon: {
        flex: 1,
        resizeMode: 'contain',
    },
});