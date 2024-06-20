import { View, Text, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';

type ShopCondensedInfoProps = {
    id: number;
    storeName: string;
    storeAddress: string;
    storeStatus: string;
    storeClassification: string;
    storeRating: string;
    storeDist: string;
};

export default function ShopCondensedInfo(props: ShopCondensedInfoProps) {

    const { id, storeName, storeDist, storeAddress, storeRating, storeStatus, storeClassification } = props;
    // TODO: 
    // CREATE LOGIC TO PULL INFORMATION FROM BACKEND
    //const storeName = 'Ah Huat Coffee';
    //const storeDist = '300m';
    //const storeAddress = '1 Novena Express';
    //const storeRating = '3.5';
    //const storeStatus = 'Open till 10pm';
    //const storeClassification = 'Cafe, Coffee, Toast';

    // Convert storeRating and storeDist to numbers
    const rating = parseFloat(storeRating);
    const distance = parseFloat(storeDist);

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
        <Link href={`/pages/stallscreen?${queryParams}`}>
            <View style={styles.storeImageContainer}>
            <Image source={require('../assets/plateAndCutlery.png')} style={styles.storeImage} />
            </View>
            <View>
                <View style={styles.flexRowContainer}>
                <Text style={styles.informationText}>{storeName}</Text>
                <Text style={styles.storeDistance}>{storeDist}</Text>
                </View>
                <Text style={styles.informationText}>{storeAddress}</Text>
                <View style={styles.flexRowContainer}>
                <Text style={styles.informationText}>{storeRating}</Text>
                <Image source={require('../assets/star.png')} style={{height: 13, width: 13}} />
                </View>
                <Text style={styles.informationText}>{storeStatus}</Text>
                <Text style={styles.informationText}>{storeClassification}</Text>

            </View>
        </Link>

    )
}


// Initial code


/*
<Link href={{
            pathname: '/pages/stallscreen',
            params: {
                storeName,
                storeDist,
                storeAddress,
                storeRating,
                storeStatus,
                storeClassification
            }
        }}>


*/
/*
return (
        <Link href='/pages/stallscreen'>
            <View style={styles.storeImageContainer}>
            <Image source={require('../assets/plateAndCutlery.png')} style={styles.storeImage} />
            </View>
            <View>
                <View style={styles.flexRowContainer}>
                <Text style={styles.informationText}>{storeName}</Text>
                <Text style={styles.storeDistance}>{storeDist}</Text>
                </View>
                <Text style={styles.informationText}>{storeAddress}</Text>
                <View style={styles.flexRowContainer}>
                <Text style={styles.informationText}>{storeRating}</Text>
                <Image source={require('../assets/star.png')} style={{height: 13, width: 13}} />
                </View>
                <Text style={styles.informationText}>{storeStatus}</Text>
                <Text style={styles.informationText}>{storeClassification}</Text>

            </View>
        </Link>

    )*/

const styles = StyleSheet.create({
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