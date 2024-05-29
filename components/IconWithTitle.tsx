import { View, Text, StyleSheet } from 'react-native';

export default function IconWithTitle() {
    return (
        <View style={styles.appNameAndIconView}>
        <View style={styles.logoPlaceholder} />
        <Text style={styles.appName}>FoodBusters</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    appNameAndIconView: {
        flexDirection: 'row',
        justifyContent: 'center',

    },
    logoPlaceholder: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: 'tomato'
    },
    appName: {
        fontSize: 50
    },
})
