import PageBreakLine from '@/components/PageBreakLine';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TopUp() {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
            <Text style={styles.header1}>Top Up Wallet</Text>
            <PageBreakLine style='solid' />
            <ScrollView >
                <View style={styles.flexRow}>
                    <Text style={styles.header2}>Select Payment Method</Text>
                </View>
                <Text> </Text>
                <TouchableOpacity>
                    <View style={styles.flexColCenter}>
                        <View style={styles.flexRow}>
                            <Icon name='cc-mastercard' size={50} />
                            <Text> </Text>
                            <Icon name='cc-visa' size={50} />
                        </View>
                        <Text>Credit Card</Text>
                    </View>
                </TouchableOpacity>
                    <Text/>
                <TouchableOpacity>
                    <View style={styles.flexColCenter}>
                        <View style={styles.flexRow}>
                            <Icon name='paypal' size={50} />
                        </View>
                        <Text>PayPal</Text>
                    </View>
                </TouchableOpacity>
                    <Text/>
                <TouchableOpacity>
                    <View style={styles.flexColCenter}>
                        <View style={styles.flexRow}>
                            <Icon name='bank' size={50} />
                        </View>
                        <Text>Bank Transfer</Text>
                    </View>
                    <Text/>
                </TouchableOpacity>
            </ScrollView>
            </View>
        </View>
    )
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
    flexColCenter: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        paddingHorizontal: 25,
        paddingVertical: 10,
    },
    innerContainer: {
        borderWidth: 1,
    }
})