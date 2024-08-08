import PageBreakLine from '@/components/PageBreakLine';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

export default function PointShop() {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
            <Text style={styles.header1}>Points Shop</Text>
            <PageBreakLine style='solid' />
            <ScrollView >
                <View style={styles.flexRow}>
                    <Text style={styles.header2}>The shop is currently empty </Text>
                    <Icon name='meh' size={15} />
                </View>
            </ScrollView>
            </View>
        </View>
    )
}

type ShopItemProps = {
    item: string;
    price: number;
}

function shopItem() {

}

const styles = StyleSheet.create({
    header1: {
        fontSize: 20,
    },
    header2: {
        fontSize: 15,
    },
    flexRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        paddingHorizontal: 25,
        paddingVertical: 10,
    },
    innerContainer: {
        borderWidth: 1,
    }
})