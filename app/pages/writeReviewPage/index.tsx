import { StyleSheet, View, Text, ScrollView, TextInput, Alert } from "react-native";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Icon from 'react-native-vector-icons/AntDesign';
import Slider from '@react-native-community/slider'; //npm install @react-native-community/slider <= Make sure to run this first
import Button from "@/components/Button";
import ImagePickerButton from "./components/imagePicker";
import axios from "axios";
import LinkIconButtonWithOptionalText from "@/components/LinkIconButtonWithOptionalText";


export default function WriteReviewPage() {

    const [username, setUsername] = useState("");
    const { stallName, stallAddress, restaurantID } = useLocalSearchParams();
    const [rating, setRating] = useState(0);
    const [image, setImage] = useState('');
    const [review, setReview] = useState('');

    const getUserCreds = async () => {
        try {
            const result = await axios.get("http://10.0.2.2:4200/getUserCreds");
            setUsername(result.data[1]);
            console.log(username);
        } catch (error) {
            console.error(error);
        }
    }

    const [hasPastReview, setHasPastReview] = useState(false)
    const getPastReview = async () => {
        try {
            const result = await axios.get(`http://10.0.2.2:4200/getUserReview?restaurantID=${restaurantID}&username=${username}`);
            if (result.data.length != 0) {
                setReview(result.data[0].userReview);
                setRating(parseFloat(result.data[0].userRating));
                setHasPastReview(true);
            }
            setLoading(true);
        } catch (error) {
            console.error(error);
        }
    }

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getUserCreds();
        getPastReview();
    }, [username, loading])

    const formatRating = (value: number) => {
        return `${value.toFixed(1)} / 5.0`;
    };
    
    const [emptyReview, setEmptyReview] = useState(false);

    const shareYourReviewFunc = async () => {
        if (review.length == 0) {
            setEmptyReview(true);
            return;
        }
        console.log(hasPastReview);
        // handle adding review to mysql
        if (!hasPastReview) {
            // no previous review, insert new review
            await axios.post("http://10.0.2.2:4200/postReview", {restaurantId:restaurantID, username:username, review:review, rating:rating.toFixed(1)})
                        .then(() => showAlert(true))
                        .catch(error => {
                            console.error(error);
                            showAlert(false);
                        })
        } else {
            // has previous review, modify previous review
            await axios.post("http://10.0.2.2:4200/editReview", {restaurantId:restaurantID, username:username, review:review, rating:rating.toFixed(1)})
                        .then(() => showAlert(true))
                        .catch(error => {
                            console.error(error);
                            showAlert(false);
                        })
        }
        setEmptyReview(false);

    }

    const showAlert = (b:boolean) => {
        if (b) {
            Alert.alert(
                'Review Successfully Posted!',
                '',
                [
                    {
                        text: 'close',
                        style: 'cancel',
                    }
                ], 
                {
                    cancelable: true,
                }
            )
        } else {
            Alert.alert(
                'Error Posting Review',
                'Something went wrong when posting your review, please try again',
                [
                    {
                        text: 'close',
                        style: 'cancel'
                    }
                ], 
                {
                    cancelable: true,
                }
            )
        }
    }
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.storeInfo}>
                <Text style={styles.storeName}>{stallName}</Text>
                <Text style={styles.storeAddress}>{stallAddress}</Text>
            </View>
            <View style={styles.ratingContainer}>
                <View style={styles.rating}>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Icon
                            key={i}
                            name="staro"
                            size={40}
                            color={i <= rating ? "orange" : "gray"}
                            
                        />
                    ))}
                </View>
                <Text style={styles.currentRating}>Rating: {formatRating(rating)}</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={5}
                    step={0.1}
                    value={rating}
                    onValueChange={setRating}
                    minimumTrackTintColor="orange"
                    maximumTrackTintColor="gray"
                />
                <View style={styles.textInputContainer}>
                    <ScrollView style={styles.textInputScroll}>
                        <TextInput
                            multiline
                            numberOfLines={4}
                            placeholder="Write your review here..."
                            defaultValue={review}
                            onChangeText={setReview}
                            style={styles.textInput}
                        />
                    </ScrollView>
                    <LinkIconButtonWithOptionalText
                        iconName="close"
                        fn={() => setReview("")}
                    />
                </View>
                {emptyReview && <Text style={{color:"red"}}>Please Leave Your Review Above</Text>}

            </View>
            <ImagePickerButton imageUri={image} setImageUri={setImage} />

            <View style={styles.buttonContainer}>                
                <Button
                text="Share Your Review"
                fontSize={20}
                bgColor={'green'}
                border={"rounded"}
                underline={false}
                fn={shareYourReviewFunc}
                ></Button>
            </View>            
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    storeInfo: {
        marginLeft: '25%',
        marginBottom: 16,
    },
    storeName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    storeAddress: {
        fontSize: 14,
        color: 'gray',
    },
    rating: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',  // Ensure the rating container takes up the full width
    },
    padding: {
        paddingHorizontal: 10
    },
    ratingContainer: {
        alignItems: 'center',
        width: '100%',  // Ensure the rating container takes up the full width
    },
    slider: {
        width: '100%',
        height: 40,
        marginTop: 16,
        alignSelf: 'center',  // Align the slider to the center horizontally
    },
    currentRating: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textInputContainer: {
        width: '100%',
        marginTop: 16,
        paddingHorizontal: 10,
        flexDirection:"row",
        alignItems:'center',
        borderWidth: 1,
        borderRadius: 10,
    },
    textInputScroll: {
        maxHeight: 200,
        borderColor: 'gray',
        paddingHorizontal: 8,
    },
    textInput: {
        fontSize: 16,
    },
    buttonContainer: {
        alignSelf: 'center',
        marginBottom: 16,
    },
})
