import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import ShopCondensedInfo from '@/app/pages/stallscreen/components/shopCondensedInfo';
import UserInfo from './components/userInfo';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import ProfileNavBar from './components/profileNavBar';
import Button from '@/components/Button';
import ReviewsListView from './components/reviewsListView';

export default function ProfilePage() {
    // TODO: 
    // SET LOGIC FOR PULLING USER INFORMATION FROM DATABASE
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);

    const getUserCreds = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:4200/getUserCreds');
            const data = response.data;
            console.log(data);
            setEmail(data[1]);
            setUsername(data[0]);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    // TODO:
    // SET LOGIC FOR SWITCHING CONTENT TO BE DISPLAYED BETWEEN "REVIEWS", "IMAGES" AND "FAVORITES"
    const [showReviews, setShowReviews] = useState(true);
    const [showImages, setShowImages] = useState(false);
    const [showFavorites, setShowFavorites] = useState(false);
    // TODO: 
    // HANDLE REDIRECTION TO EDIT PROFILE PAGE
    const handleEditProfileClick = () => {
        console.log('redirect to edit profile');
    }
    useEffect(() => {
        console.log("restarted");
        getUserCreds();
    }, []);


    // TODO: 
    // CREATE UI FOR REVIEWS AND IMAGES PAGE
    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
                <Navbar/>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <UserInfo username={username} email={email} />
            <ProfileNavBar setShowFavorites={setShowFavorites} setShowImages={setShowImages} setShowReviews={setShowReviews} />
            <ScrollView>
                {showReviews && ReviewsListView(email)   }
                {showFavorites && <ShopCondensedInfo/>}
                {showImages && <ImageView email={email} />}
            </ScrollView>
            <Navbar/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between', 
        height: '100%'
    }
});

type ImageViewProps = {
    email:string;
}

function ImageView({email}:ImageViewProps) {
    const [images, setImages] = useState<string[][]>([]);
    const [loaded, setLoaded] = useState(false);
    const fetch = async () => {
        try {
            // need to find a way to store the username 
            const response = await axios.get(`http://10.0.2.2:4200/getAllImgs/${email}`);

            // Process rawdata to create images array
            let count = -1;
            let temp:string[][] = [];
            for (let i = 0; i < response.data.length; i++) {
                if (i % 3 === 0) {
                    count++;
                    temp.push([]);
                }
                temp[count].push(response.data[i]);
            }
            setImages(temp);
            setLoaded(true);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        console.log("load images");
        fetch();
    }, []);

    if (!loaded) {
        return <View><Text>Loading...</Text></View>;
    }

    return (
        <View>
            {
                images.map((triplet, rowIndex) => {
                    return (
                        <View style={{ flexDirection: "row" }} key={rowIndex}>
                            {triplet.map((index) => {
                                return (
                                    <Image
                                        source={{ uri: `http://10.0.2.2:4200/getImg/${index}` }}
                                        style={{ width: '33%', aspectRatio: '1/1' }}
                                        key={index}
                                    />
                                );
                            })}
                        </View>
                    );
                })
            }
        </View>
    );
}