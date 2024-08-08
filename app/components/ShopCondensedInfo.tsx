import { View, Text, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';

type ShopCondensedInfoProps = {
    id: number;
    storeName: string;
    storeAddress: string;
    storeStatus: string;
    storeClassification: string;
    storeRating: string | number;
    storeDist: string;
    storeImage: string;
};

export default function ShopCondensedInfo(props: ShopCondensedInfoProps) {

    const { id, storeName, storeDist, storeAddress, storeRating, storeStatus, storeClassification, storeImage } = props;
    // TODO: 
    // CREATE LOGIC TO PULL INFORMATION FROM BACKEND
    //const storeName = 'Ah Huat Coffee';
    //const storeDist = '300m';
    //const storeAddress = '1 Novena Express';
    //const storeRating = '3.5';
    //const storeStatus = 'Open till 10pm';
    //const storeClassification = 'Cafe, Coffee, Toast';

    // Convert storeRating and storeDist to numbers
    // const rating = parseFloat(storeRating);
    // const distance = parseFloat(storeDist);

    // Create query string with parameters
    const queryParams = `id=${id}&storeName=${storeName}&storeAddress=${storeAddress}&storeStatus=${storeStatus}&storeClassification=${storeClassification}&storeRating=${storeRating}&storeDist=${storeDist}`;



    // TODO: 
    // CREATE LOGIC TO REDIRECT TO STORE PAGE
    const handleStoreClick = () => {
        console.log('redirect to store page');
    }

    //============================================
    type ShopCondensedInfoProps = {
        storeName: string;
        storeDistance: string;
        storeAddress: string;
        storeRating: string;
        storeStatus: string;
        storeClassification: string;
      };

      

    //===============================================
    // Initially /pages/workInProgress

    return (
        <Link href={`/pages/stallscreen?${queryParams}`} replace={false}>
            <View style={styles.overallContainer}>
                {
                    storeImage ? <Image source={{uri: storeImage}} style={styles.storeImage} />
                                : <Image source={{uri: 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'}} style={styles.storeImage} />
                }
                <View>
                    <View style={styles.flexRowContainer}>
                        <Text>{storeName} </Text>
                        <Text style={styles.storeDistance}>{storeDist}m</Text>
                    </View>
                    <Text style={styles.informationText}>{storeAddress}</Text>
                    <View style={styles.flexRowContainer}>
                        <Text>{storeRating}</Text>
                        <Image source={require('../assets/star.png')} style={{height: 13, width: 13}} />
                    </View>
                    <Text style={styles.informationText}>{storeStatus}</Text>
                    <Text style={styles.informationText}>{storeClassification}</Text>
                </View>
            </View>
        </Link>

    )
}

const styles = StyleSheet.create({
    shopButton: {
        flexDirection: 'row',
        borderWidth: 1,
    },
    storeImage: {
        height: 100,
        width: 100,
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
        flexWrap: 'wrap',
        paddingLeft: 10,
        alignItems: 'center',
        width: 260,
    }, 
    overallContainer: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        flexDirection: 'row',
        width: 380,
    },
})