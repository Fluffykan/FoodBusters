import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';
import UserInfo from './components/userInfo';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import ProfileNavBar from './components/profileNavBar';
import ReviewsComponent from '../stallscreen/components/reviewsComponent';
import ShopCondensedInfo from '@/app/components/ShopCondensedInfo';

export default function ProfilePage() {
    // TODO: 
    // SET LOGIC FOR PULLING USER INFORMATION FROM DATABASE
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);

    const getUserCreds = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:4200/getUserCreds');
            const data = response.data;
            console.log(data);
            setUserId(data[0]);
            setEmail(data[2]);
            setUsername(data[1]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    // TODO:
    // SET LOGIC FOR SWITCHING CONTENT TO BE DISPLAYED BETWEEN "REVIEWS", "IMAGES" AND "FAVORITES"
    const [screen, setScreen] = useState(0);
    /*
        0 -> reviews
        1 -> images
        2 -> favorites
    */
    // TODO: 
    // HANDLE REDIRECTION TO EDIT PROFILE PAGE
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
            <ProfileNavBar toggleScreen={setScreen} />
            <ScrollView>
                {screen == 0 && <ReviewsListView email={email} userId={userId} />}
                {screen == 2 && <FavListView email={email} userId={userId} />}
                {screen == 1 && <ImageView email={email} userId={userId} />}
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

type ViewProps = {
    email:string;
    userId:string;
}

function ImageView({email}:ViewProps) {
    const [images, setImages] = useState<string[][]>([]);
    const fetch = async () => {
        try {
            // need to find a way to store the username 
            const response = await axios.get(`http://10.0.2.2:4200/getAllImgs/` + email);

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
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        console.log("load images");
        fetch();
    }, []);

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

function ReviewsListView({userId}:ViewProps) {
    const [reviews, setReveiws] = useState([]);

    const getReviews = async () => {
        try {
            const response = await axios.get("http://10.0.2.2:4200/getUserReviews/" + userId);
            console.log(reviews);
            setReveiws(response.data);
        } catch (error) {
            console.error(error);
        }
        
    }

    useEffect(() => {
        console.log("load reviews");
        getReviews();
    }, []);

    return (
        <View>
            { /* redlines are there but it works as intended, just leave it alone */
            reviews.map(review => <ReviewsComponent restaurantId={review.restaurantID} reviewID={review.reviewID} userID={review.username} userReview={review.userReview} userRating={review.userRating} />)}
        </View>
    )

}

function FavListView({userId}:ViewProps) {
    const [favorites, setFavorites] = useState([]);
    const getFavorites = () => {
        try {
            axios.post("http://10.0.2.2:4200/getFavorites", {userId:userId})
                .then(response => {
                    console.log(response.data);
                    setFavorites(response.data);
                });
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        console.log("loading reviews");
        getFavorites();
        console.log(favorites);
    },[]);
    return (
        <View>
            { /* red underline cannot be removed, but works as intended */
            favorites.map(store => <ShopCondensedInfo
                                        key={store.id}
                                        id={store.id}
                                        storeName={store.storeName}
                                        storeAddress={store.storeAddress}
                                        storeRating={store.storeRating}
                                        storeClassification={store.storeClassification}
                                        storeDist={store.storeDist}
                                        storeStatus={store.storeStatus}
                                    />
            )}
        </View>
    )
}