import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

type LoyaltyPointsProps = {
    points: number;
}

export default function LoyaltyPointsBar({points}:LoyaltyPointsProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Loyalty Points</Text>
            <Icon name="gift" size={50} color="black" />
            <Text style={styles.number}>{points}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'center',
        padding: 5,
    },
    text: {
        fontSize: 30,
        fontFamily: 'sans-serif',
        color: 'black',
        paddingHorizontal: 8,
    },
    number: {
        borderWidth: 3.5,
        borderRadius: 20,
        fontSize: 30,
        position: 'relative',
        paddingHorizontal: 35
    }
})