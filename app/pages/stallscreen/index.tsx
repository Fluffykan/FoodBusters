import { StyleSheet, View, Text, Image, Button, TouchableOpacity, Pressable, ScrollView, TextInput } from "react-native";
import { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import TopButtonPlusHeader from "@/components/TopButtonPlusHeader";
import StallNamePlusButtons from './components/stallNamePlusButtons';
import AddressPlusButtons from './components/addressPlusButtons';
import ReviewsComponent from './components/reviewsComponent';
import PageBreakLine from "@/components/PageBreakLine";
import Navbar from "@/components/Navbar";
import LinkIconButtonWithOptionalText from "@/components/LinkIconButtonWithOptionalText";

type StallScreenProps = {
    id: number;
    storeName: string;
    storeAddress: string;
    storeStatus: string;
    storeClassification: string;
    storeRating: string;
    storeDist: string;
};

type Review = {
    reviewID: number;
    restaurantID: number;
    userID: string;
    userReview: string;
    userRating: string;
};


export default function StallScreen() {

    // Added this line
    const { id, storeName, storeAddress, storeStatus, storeClassification, storeRating, storeDist } = useLocalSearchParams();

    const [keywords, changeKeywords] = useState('');

    // Added this
    const [reviews, setReviews] = useState<Review[]>([]);
    const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [averageRating, setAverageRating] = useState<number | null>(null);
    const [storeImage, setStoreImage] = useState<string>('');

    const [isFavorited, setFavorited] = useState(false);
    const [storeUserId, setUserId] = useState("");
    const [numentries, setnumentries] = useState(-1);
    // This database is based on Wei Bin's IP Address, could edit yours accordingly
    // This URL filters reviews based on their restaurantID which serves as a foreign key in reviewscomponent
    const url = `http://10.0.2.2:4200/reviews?restaurantID=${id}`;
    const averageRatingUrl = `http://10.0.2.2:4200/averageRating?restaurantID=${id}`;

    // This URL should display all reviews for every single restaurant
    //const url = "http://192.168.1.72:4200/allreviews";
    const restaurantID = parseInt(id as string, 10);

    const fetchReviews = () => {
        axios.get(url)
            .then(response => {
                const filtered = response.data.filter((review: Review) => review.restaurantID === parseInt(id as string, 10));
                setReviews(filtered);
                setFilteredReviews(filtered);
                console.log(filtered);
            })
            .catch(error => {
                console.error("Error fetching reviews", error);
            });
    };

    const fetchAverageRating = () => {
        axios.get(averageRatingUrl)
        .then(response => {
            setAverageRating(response.data.averageRating);
        })
        .catch(error => {
            console.error("Error fetching average rating", error);
        });
    };


    const fetchStoreImage = () => {
        const storeImageUrl = `http://10.0.2.2:4200/storeImage?restaurantID=${id}`;
        axios.get(storeImageUrl)
            .then(response => {
                const imageData = response.data.storeImage;
                if (imageData) {
                    setStoreImage(imageData);
                } else {
                    console.error("No store image data found in response:", response.data);
                }
            })
            .catch(error => {
                console.error("Error fetching store image:", error);
            });
    };

    useEffect(() => {
        getUserCreds();
        fetchReviews();
        fetchAverageRating();
        fetchStoreImage();
        setLoading(false); 
    }, []);

    // this useEffect is triggered everytime storeUserId is updated
    useEffect(() => {
        if (storeUserId) {
            checkFavorite();
        }
    }, [storeUserId]);

    const filterReviews = (keyword: string) => {
        if (!keyword) {
            setFilteredReviews(reviews); // If no keyword, show all reviews
        } else {
            const filtered = reviews.filter(review =>
                review.userID.toLowerCase().startsWith(keyword.toLowerCase())
            );
            setFilteredReviews(filtered);
        }
    };

    // Handle text input changes
    const handleKeywordChange = (text: string) => {
        changeKeywords(text);
        filterReviews(text);
    };
    const getUserCreds = () => {
        try {
            axios.get("http://10.0.2.2:4200/getUserCreds")
                .then(response => setUserId(response.data[0]));
        } catch (error) {
            console.error(error);
        }

    }

    const checkFavorite = async () => {
        try {
            axios.post("http://10.0.2.2:4200/checkFavorite", {userId:storeUserId, restaurantId:id})
                .then(response => {
                    console.log(response.data);
                    setFavorited(response.data.count > 0)
                    console.log(numentries);
                })
        } catch (error) {
            console.error(error); 
        } 
    }


    const handleFavorite = async () => {
        const result = await axios.post("http://10.0.2.2:4200/setFavorite", {userId:storeUserId, restaurantId:id});
        console.log(result.data);
        setFavorited(true);
    }

    const handleUnfavorite = async () => {
        const result = await axios.post("http://10.0.2.2:4200/removeFavorite", {userId:storeUserId, restaurantId:id})
        console.log(result.data);
        setFavorited(false);
    }


    //const { storeName, storeDistance, storeAddress, storeRating, storeStatus, storeClassification } = props;

    // TO BE FETCHED USING API
    /*const stallName = "La Jiang Shan";
    const operating = true;
    const address = '123 tangy street';
    const rating = 5;
    const foodType = 'hotpot'*/

    const handleFilterReviews = (keywords:string) => {
        console.log(`filtering reviews with: ${keywords}`);
    }
    // change replaceScreen to true after finalising the 
    if (loading) {
        return (
            <View>
                <Text>loading...</Text>
            </View>
        )
    }
    return (
        <>
            <TopButtonPlusHeader header='FoodBuster' destination="/pages/tempHomeScreen" replaceScreen={true} />

            <ScrollView style={styles.container}>
            {storeImage ? (
                    <Image style={{ height: 200, width: "100%" }} source={{ uri: storeImage }} />
                ) : (
                    <Image style={{ height: 200, width: "100%" }} source={{ uri: 'https://via.placeholder.com/200' }} />
                )}
                        <StallNamePlusButtons stallName={storeName as string || "Default Store Name"} stallAddress={storeAddress as string} restaurantID={restaurantID} />
                        <PageBreakLine style='solid' />
                        <AddressPlusButtons operating={(storeStatus as string) === "open" || false} address={storeAddress as string || "Default Address"} rating={averageRating !== null ? averageRating : NaN} foodType={storeClassification as string || "Default Food Type"} />
                        <PageBreakLine style="solid" />
                        {isFavorited ? 
                        <LinkIconButtonWithOptionalText iconName="heart" iconColor="red" text="Remove from Favorites" flexDir="row" border={true} fn={handleUnfavorite} />
                        : <LinkIconButtonWithOptionalText iconName="hearto" flexDir="row" border={true} iconColor="red" text="Save as Favorites" fn={handleFavorite} />}
                        <PageBreakLine style='solid' />
                        <View style={styles.searchBarContainer}>
                            <TextInput placeholder="Search Reviews" onChangeText={handleKeywordChange} style={styles.textInput}></TextInput>
                            <LinkIconButtonWithOptionalText iconName="search1" fn={() => filterReviews(keywords)} />
                        </View>
                    
                    {filteredReviews.map(review => (
                        <ReviewsComponent
                            key={review.reviewID} // Ensure unique key prop
                            userID={review.userID}
                            userReview={review.userReview}
                            userRating={review.userRating}
                        />
                    ))}
                    
            </ScrollView>
            <Navbar />

        </>
    );
}

/*
<Image style={{height:200, width:"100%"}}
                            source={{ uri: 'https://singaporebeauty.com/wp-content/uploads/2021/10/la-jiang-shan-selegie-dhoby-ghaut-orchard-buffet.jpg' }} />

*/
// Previous rating code
// rating={parseInt(storeRating as string, 10) || 0} 
// <LinkIconButtonWithOptionalText iconName="search1" fn={() => handleFilterReviews(keywords)} />

// Else condition for image display
// <Image style={{ height: 200, width: "100%" }} source={{ uri: 'https://via.placeholder.com/200' }} />
// <Text>Sorry, there is no image uploaded. Perhaps you could be the first to upload one !</Text>

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5
    },
    textInput: {
        paddingLeft: 10,
        flex: 1,
    },
    searchBarContainer: {
        borderWidth: 2,
        borderRadius: 8,
        justifyContent: "space-between",
        flexDirection: "row",
        width: "100%",
        alignItems: 'center',
    }
})