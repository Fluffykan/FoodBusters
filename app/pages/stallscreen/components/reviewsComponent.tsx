import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { useEffect, useState } from "react";
import Icon from 'react-native-vector-icons/AntDesign';
import LinkIconButtonWithOptionalText from "@/components/LinkIconButtonWithOptionalText";
import axios from "axios";

type ReviewsComponentProps = {
    reviewID: number;
    userID: string;
    userReview: string;
    userRating: string;
    restaurantId?: number;
    image?: number;
};

export default function ReviewsComponent({ userID, userReview, image, userRating, reviewID, restaurantId }: ReviewsComponentProps) {

    const name = "DomTor";
    const rating = "4.5";
    const tempReview = "Review: Amazing food with great service here..."

    /*
    // ReadMore functionality is removed, can add back if time and skill permits in the future

    const [readMoreButtonIsPressed, setReadMoreButton] = useState(false)
    const toggleReadMoreButton = () => {
        setReadMoreButton(!readMoreButtonIsPressed)
        console.log("Extending Review...")
    }
    */
   
    // Truncate the review since it is too long. Shows only the first 5 words of the review padded by "..." at the end
    const [truncatedReview, setTruncatedReview] = useState(true);
    const truncateReview = (review: string, wordLimit: number) => {
        const words = review.split(" ");
        if (words.length <= wordLimit) {
            return review; // Return the full review if it's less than or equal to the word limit
        }
        return words.slice(0, wordLimit).join(" ") + "...";
    };

    const [activeUserId, setActiveUserId] = useState(-1);
    const getActiveUserId = async () => {
        try {
            const result = await axios.get("http://10.0.2.2:4200/getUserCreds");
            setActiveUserId(result.data[0]);
        } catch (error) {
            console.error(error);
        }
    }
    const [storeName, setStoreName] = useState("");
    const getStoreName = async () => {
        try {
            const result = await axios.get(`http://10.0.2.2:4200/getStoreName?restaurantId=${restaurantId}`);
            setStoreName(result.data.storeName);
        } catch (error) {
            console.error(error);
        }
    }
    const [isLiked, setLiked] = useState(false);
    const checkLiked = async () => {
        try {
            const result = await axios.get(`http://10.0.2.2:4200/checkLiked?userId=${activeUserId}&reviewId=${reviewID}`);
            setLiked(result.data[0].count > 0);
        } catch (error) {
            console.error(error);
        }
    }
    
    const [numLikes, setNumLikes] = useState(0);
    const getNumLikes = async () => {
        const result = await axios.get(`http://10.0.2.2:4200/getNumLikes?reviewId=${reviewID}`);
        setNumLikes(result.data.count);
    }

    const updateLike = async () => {
        try {
            if (isLiked) {
                await axios.post(`http://10.0.2.2:4200/unlikeReview?userId=${activeUserId}&reviewId=${reviewID}`);
                setLiked(!isLiked);
            } else {
                await axios.post(`http://10.0.2.2:4200/likeReview?userId=${activeUserId}&reviewId=${reviewID}`);
                setLiked(!isLiked);
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        console.log('reloaded');
        getActiveUserId();
        if (restaurantId) {
            getStoreName();
        }
    },[activeUserId, storeName]);

    useEffect(() => {
        checkLiked();
        getNumLikes();
    }, [activeUserId, isLiked, numLikes]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => setTruncatedReview(!truncatedReview)}>

                <View style={styles.userInfoWLike}>
                    <View style={styles.userInfo}>
                        <Icon name="user" size={50} color="black" />
                        <View>
                            <View style={styles.usernameAndRating}>
                                <Text>By: {userID}</Text>
                                {restaurantId && <Text>Store: {storeName}</Text> }
                                <View style={styles.rating}>
                                    <Text>Rating: {userRating}</Text>
                                    <Icon name="staro" size={15} color="black" />
                                    <Text> / 5.0</Text>
                                    <Icon name="staro" size={15} color="black" />
                                </View>
                            </View>
                        </View>
                    </View>
                    <LinkIconButtonWithOptionalText 
                        iconName="like2" 
                        iconColor={isLiked ? "red" : 'black'}
                        text={numLikes.toString()}
                        fn={updateLike}
                    />
                </View>
                <View style={styles.review}>
                        {!truncatedReview && <Text style={styles.reviewText}>{userReview}</Text>}
                        {truncatedReview && <Text style={styles.reviewText}>{truncateReview(userReview, 7)}</Text>}
                        <Text/>
                        {image && <Image source={{uri:`http://10.0.2.2:4200/getImg/${image}`}} style={{aspectRatio: '1/1', height: 100}} />}
                </View>
                
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 10,
        borderWidth: 2,
        padding: 5,
    },
    usernameAndRating: {
        justifyContent: "center",
        flex: 1,
    },
    rating: {
        flexDirection: "row",
    },
    userInfo: {
        flexDirection: 'row',
    },
    review: {
        paddingHorizontal: 10,
    },
    userInfoWLike: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: "space-between",
        alignItems: 'center',
    }, 
    reviewText: {
        textAlign: 'justify',
    }
})