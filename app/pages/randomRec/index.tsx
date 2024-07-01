import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import DropDownSelector from '@/components/DropdownSelector';
import axios, { AxiosResponse } from 'axios';
import LinkIconButtonWithOptionalText from '@/components/LinkIconButtonWithOptionalText';
import ShopCondensedInfo from '../stallscreen/components/ShopCondensedInfo';
import Button from '@/components/Button';

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
    return (
        <View style={styles.container}>
            <View>
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
            </View>
            <View>
            <Button 
                text='Seen this store before? Get another recommendation' 
                textColor='black' 
                border = 'none'
                underline = {true}
                bgColor='transparent' 
                fn={queryStore} 
            />

            </View>
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
})