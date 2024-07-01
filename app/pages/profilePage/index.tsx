import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Image, TouchableOpacity } from 'react-native';
import UserInfo from './components/userInfo';
import Navbar from '@/components/Navbar';
import axios from 'axios';
import ProfileNavBar from './components/profileNavBar';
import ReviewsComponent from '../stallscreen/components/reviewsComponent';

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
    const [screen, setScreen] = useState(0);
    /*
        0 -> reviews
        1 -> images
        2 -> favorites
    */
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
            <ProfileNavBar toggleScreen={setScreen} />
            <ScrollView>
                {screen == 0 && <ReviewsListView email={email} />}
                {screen == 2 && <Text>favorites</Text>}
                {screen == 1 && <ImageView email={email} />}
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

function ReviewsListView({email}:ViewProps) {
    const [reviews, setReveiws] = useState([]);

    const getReviews = async () => {
        try {
            const response = await axios.get("http://10.0.2.2:4200/getUserReviews/" + email);
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
            { /* redlines are there but it works, just leave it alone */
            reviews.map(review => <ReviewsComponent userID={review.username} userReview={review.userReview} userRating={review.userRating} />)}
        </View>
    )

}