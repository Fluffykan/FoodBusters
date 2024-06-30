import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';

export default function ShopCondensedInfoOld() {
    // CREATE LOGIC TO PULL INFORMATION FROM BACKEND
    const storeName = 'Ah Huat Coffee';
    const storeDist = '300m';
    const storeAddress = '1 Novena Express';
    const storeRating = '3.5';
    const storeStatus = 'Open till 10pm';
    const storeClassification = 'Cafe, Coffee, Toast';

    return (

        <Link href='/pages/stallscreen' style={{borderWidth: 1}}>
            <View style={styles.container}>
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
                        <Icon name="staro" size={15} color="black" />
                    </View>
                    <Text style={styles.informationText}>{storeStatus}</Text>
                    <Text style={styles.informationText}>{storeClassification}</Text>
                </View>
            </View>
        </Link>

    )
}

const styles = StyleSheet.create({
    container: {
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
        paddingHorizontal: 5,
    },
    flexRowContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    }
})