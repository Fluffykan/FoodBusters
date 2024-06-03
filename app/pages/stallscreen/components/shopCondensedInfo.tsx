import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Link } from 'expo-router';

export default function ShopCondensedInfo() {
    // TODO: 
    // CREATE LOGIC TO PULL INFORMATION FROM BACKEND
    const storeName = 'Ah Huat Coffee';
    const storeDist = '300m';
    const storeAddress = '1 Novena Express';
    const storeRating = '3.5';
    const storeStatus = 'Open till 10pm';
    const storeClassification = 'Cafe, Coffee, Toast';

    // TODO: 
    // CREATE LOGIC TO REDIRECT TO STORE PAGE
    const handleStoreClick = () => {
        console.log('redirect to store page');
    }

    return (

        <Link href='/pages/workInProgress'>
            <View style={styles.flexDirecRow}>
                <View style={styles.storeImageContainer}>
                    <Text>image placeholder</Text>
                </View>
                <View>
                    <View style={styles.flexRowContainer}>
                    <Text style={styles.informationText}>{storeName}</Text>
                    <Text style={styles.storeDistance}>{storeDist}</Text>
                    </View>
                    <Text style={styles.informationText}>{storeAddress}</Text>
                    <View style={styles.flexRowContainer}>
                    <Text style={styles.informationText}>{storeRating}</Text>
                    <Text>image placeholder</Text>
                    </View>
                    <Text style={styles.informationText}>{storeStatus}</Text>
                    <Text style={styles.informationText}>{storeClassification}</Text>
                </View>
            </View>
        </Link>

    )
}

const styles = StyleSheet.create({
    flexDirecRow: {
        flexDirection: "row",
        borderWidth: 1.5,
        borderRadius: 6,
        width: "100%",
        
    },
    shopButton: {
        flexDirection: 'row',
        borderWidth: 1,
    },
    storeImage: {
        resizeMode: 'stretch',
        flex: 1,
    },
    storeImageContainer: {
        width: '30%',
        height: '100%',
        borderWidth: 1,
        backgroundColor: 'black',

    },
    informationText: {
        paddingLeft: 10,
        paddingRight: 5,
    },
    storeDistance: {
        backgroundColor: 'blue',
        borderRadius: 5,
        color: 'white',
        alignContent: 'center',

        paddingRight: 5,
        paddingLeft: 5,
    },
    flexRowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})