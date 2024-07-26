import { View, Text, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';

type RecommendedCondensedInfoProps = {
    id: number;
    storeName: string;
    storeAddress: string;
    storeStatus: string;
    storeClassification: string;
    storeRating: string;
    storeDist: string;
    username: string;
    userrank: string;
};

export default function RecommendedCondensedInfo(props: RecommendedCondensedInfoProps) {

    const { id, storeName, storeDist, storeAddress, storeRating, storeStatus, storeClassification, username, userrank } = props;

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

    return (
        <Link href={`/pages/stallscreen?${queryParams}`} style={styles.overallContainer} replace={true}>
            <View>
                <View style={styles.recommendationContainer}>
                    <View style={styles.flexRowContainer}>
                        <Text style={styles.recommendedByText}>Recommended By: {username}</Text>
                    </View>
                    <Text style={styles.userrankText}>Rank: {userrank}</Text>
                </View>

                <View style={{flexDirection: 'row'}}>
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
                </View>
            </View>
        </Link>
    )
}

const styles = StyleSheet.create({
    overallContainer: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        flexDirection: 'column',
        width: '100%',
        marginBottom: 10,
    },
    recommendationContainer: {
        marginBottom: 10,
    },
    recommendedByText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    flexRowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    usernameText: {
        fontSize: 16,
        marginRight: 5,
    },
    profileIcon: {
        height: 20,
        width: 20,
        marginRight: 5,
    },
    userrankText: {
        fontSize: 16,
    },
    storeImageContainer: {
        width: '30%',
        height: '100%',
        aspectRatio: "1/1",
        backgroundColor: 'black',
        padding: 5,
    },
    storeImage: {
        resizeMode: 'stretch',
        width: '100%',
        height: '100%',
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
});
