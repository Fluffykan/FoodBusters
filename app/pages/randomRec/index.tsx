import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import UserCondensedInfo from '@/app/components/UserCondensedInfo';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import axios from 'axios';
import ShopCondensedInfo from '@/app/components/ShopCondensedInfo';
import Button from '@/components/Button';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import PageBreakLine from '@/components/PageBreakLine';

export default function RandomRec() {
    const [loading, setLoading] = useState(false);
    const [rec, setRec] = useState<Restaurant[]>([]);

    type Restaurant = {
        id: number;
        storeName: string;
        storeAddress: string;
        storeStatus: string;
        storeClassification: string;
        storeRating: string;
        storeDist: string;
        averageRating: number | null; // Added this field. For some restaurants where there are no reviews added, there would be no average rating, hence the null value
      };

      const weibinURL = 'http://192.168.1.71:4200/getRandomStore';


      const queryStore = () => {
        axios.get("http://10.0.2.2:4200/getRandomStore")
        .then(response => {
            console.log(response.data);
            setRec(response.data);
        })
        .catch(error => {
            console.error(error);
        });
      }

    useEffect(() => {
        console.log("reload");
        queryStore();
        
    }, []);

    if (loading) {
        return (
            <View>
                <Text>Loading....</Text>
            </View>
        )
    }

    const pointsBenefitSentence = "Did you know you can recommend dishes to other users based on their preferences. Successful recommendations will earn you loyalty points that can be exchanged for cash prizes and discounts at various dining spots!"
    const indicatePreferenceSentence = "Indicate your preferences for other users to share their culinary insights with you!"
    const recommendedFoodBySomeone = "Click below to check the food recommended by other users!"
    return (
        <View style={styles.container}>
            <Header header="FoodBusters" />
            <PageBreakLine style="solid" />

            <ScrollView>
                <Header header="Today's Recommendation" size='med'/>
                {/* this shows that there's an error, but actually theres no problem, idk how to ignore the redline */
                rec.map(restaurant => 
                    <ShopCondensedInfo
                        key={restaurant.id} // Ensure unique key prop
                        id = {restaurant.id} // Pass the id to ShopCondensedInfo
                        storeName={restaurant.storeName}
                        storeDist={restaurant.storeDist.toString()}
                        storeAddress={restaurant.storeAddress}
                        storeRating={restaurant.storeRating} // Handle null value
                        storeStatus={restaurant.storeStatus}
                        storeClassification={restaurant.storeClassification}
                    />
                )}
                <Button 
                    text='Seen this store before? Get another recommendation' 
                    textColor='black' 
                    border='none'
                    underline={true}
                    bgColor='transparent' 
                    fn={queryStore} 
                />
                <View style={styles.buttonContainer}>
                    <Header header="Send Recommendations to Others" size='med' />
                    <View style={styles.iconRow}>
                        <FontAwesome5 name="utensils" size={24} color="black" />
                        <FontAwesome5 name="pizza-slice" size={24} color="black" />
                        <FontAwesome5 name="ice-cream" size={24} color="black" />
                        <FontAwesome5 name="hamburger" size={24} color="black" />
                        <FontAwesome5 name="drumstick-bite" size={24} color="black" />
                        <FontAwesome5 name="fish" size={24} color="black" />
                    </View>
                    <View style={styles.pointsBenefitContainer}>
                        <MaterialIcons name="error-outline" size={50} color="black" />
                        <Text style={styles.pointsBenefitText}>{pointsBenefitSentence}</Text>
                    </View>
                    <Link href='pages/recommendPage' style={styles.curlyButton}>
                        <Text style={styles.curlyButtonText}>Click here to recommend your best dishes!</Text>
                    </Link>

                    <View style={styles.pointsBenefitContainer}>
                        <MaterialIcons name="favorite" size={50} color="black" />
                        <Text style={styles.pointsBenefitText}>{indicatePreferenceSentence}</Text>
                    </View>
                    <Link href='pages/indicatePreferencePage' style={styles.curlyButton}>
                        <Text style={styles.curlyButtonText}>Click here to indicate your preference!</Text>
                    </Link>

                    <View style={styles.pointsBenefitContainer}>
                        <MaterialIcons name="mail" size={50} color="black" />
                        <Text style={styles.pointsBenefitText}>{recommendedFoodBySomeone}</Text>
                    </View>
                    <Link href='pages/checkRecommendedFood' style={styles.curlyButton}>
                        <Text style={styles.curlyButtonText}>Check what has been recommended!</Text>
                    </Link>
                </View>
            </ScrollView>
            <Navbar />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 5,
    },
    buttonContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        width: "100%",
    },
    pointsBenefitContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        borderStyle: 'dotted',
    },
    pointsBenefitText: {
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    curlyButton: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginTop: 10,
        //borderStyle: 'dotted',
    },
    curlyButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
})