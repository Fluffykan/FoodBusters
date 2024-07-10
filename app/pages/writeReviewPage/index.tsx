import { StyleSheet, View, Text, ScrollView, TextInput } from "react-native";
import { useState } from "react";
import { useLocalSearchParams } from "expo-router";
import Icon from 'react-native-vector-icons/AntDesign';
import Slider from '@react-native-community/slider'; //npm install @react-native-community/slider <= Make sure to run this first
import Button from "@/components/Button";
import ImagePickerButton from "./components/imagePicker";
import axios from "axios";


export default function WriteReviewPage() {

    /*const storeName = "La Jiang Shan";
    const storeAddress = "@ Selegie Road";*/
    
    const { stallName, stallAddress } = useLocalSearchParams();
    const [rating, setRating] = useState(0);
    const [image, setImage] = useState('');

    const formatRating = (value: number) => {
        return `${value.toFixed(1)} / 5.0`;
    };

    const uploadImg = async () => {
        try {
        console.log(image);
        const ownerInfo = await axios.get("http://10.0.2.2:4200/getUserCreds");
        const ownerEmail = ownerInfo.data[2];
        // const data = readImageFile(image);

        // function readImageFile (file:string) {
        //     const bitmap = fs.readFileSync(file)
        //     const buf = new Buffer.from(bitmap);
        //     return buf;
        // }
        const response = await axios.post("http://10.0.2.2:4200/uploadImg", {uri:image, owner:ownerEmail})
        console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    const shareYourReviewFunc = () => {
        console.log("Sharing Your Photos...");
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
                            style={styles.textInput}
                        />
                    </ScrollView>
                </View>
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
    },
    textInputScroll: {
        maxHeight: 200,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
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
