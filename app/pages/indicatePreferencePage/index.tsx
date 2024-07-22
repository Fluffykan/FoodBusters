import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export default function IndicatePreferencePage() {
    
    const [userId, setUserId] = useState("");
    const [username, setUsername] = useState("");
    const [rank, setRank] = useState("");
    const [preference, setPreference] = useState("");
    const [loading, setLoading] = useState(true);
    const [inputText, setInputText] = useState("");
    const [charCount, setCharCount] = useState(0);

    const weibinURL = 'http://192.168.1.71:4200/getUserCreds'
    const junHongURL = 'http://10.0.2.2:4200/getUserCreds'

    const getUserData = async () => {
        try {
            const response = await axios.get(weibinURL);
            const data = response.data;
            console.log(data);
            setUserId(data[0]);
            setUsername(data[1]);
            setPreference(data[4]); 
            setRank(data[7]);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        console.log("Fetching user data...");
        getUserData();
    }, []);

    const handleTextChange = (text: string) => {
        if (text.length <= 300) {
            setInputText(text);
            setCharCount(text.length);
        }
    };

    const updatePreferenceURLWeiBin = 'http://192.168.1.71:4200/updatePreference'

    const handleUpdatePreference = async () => {
        try {
            const response = await axios.put(updatePreferenceURLWeiBin, {
                userId,
                preference: inputText
            });
            console.log('Preference updated:', response.data);
            // Optionally, you can update the state to reflect the new preference
            setPreference(inputText);
        } catch (error) {
            console.error('Error updating preference:', error);
        }
    };

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
                <Navbar />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Header header='FoodBuster' />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.dottedBorder}>
                    <View style={styles.iconTextContainer}>
                        <Icon name="cutlery" size={40} color="black" style={styles.icon} />
                        <Text style={styles.introText}>
                            Craving for a certain food but not sure where to find it, get others to recommend you by indicating your preference here!
                        </Text>
                    </View>
                </View>
                <View style={styles.curlyBorder}>
                    <Text style={styles.label}>Username: {username}</Text>
                    <Text style={styles.label}>Current Preference: {preference}</Text>
                    <Text style={styles.label}>Rank: {rank}</Text>
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        multiline
                        value={inputText}
                        onChangeText={handleTextChange}
                        placeholder="Indicate your preference here..."
                    />
                    <Text style={styles.charCount}>{charCount} / 300</Text>
                </View>
                <View style={styles.iconRow}>
                        <FontAwesome5 name="utensils" size={24} color="black" />
                        <FontAwesome5 name="pizza-slice" size={24} color="black" />
                        <FontAwesome5 name="ice-cream" size={24} color="black" />
                        <FontAwesome5 name="hamburger" size={24} color="black" />
                        <FontAwesome5 name="drumstick-bite" size={24} color="black" />
                        <FontAwesome5 name="fish" size={24} color="black" />
                    </View>
                <View style={styles.buttonContainer}>
                    <Button
                        text="Indicate your preference"
                        fn={handleUpdatePreference}
                        bgColor="#0000FF"
                    />
                </View>
            </ScrollView>
            <Navbar />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 20,
        paddingTop: 20,
    },
    dottedBorder: {
        borderWidth: 1,
        borderColor: 'black',
        borderStyle: 'dotted',
        padding: 10,
        marginVertical: 10,
        borderRadius: 2,
        width: '100%',
    },
    iconTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    icon: {
        marginRight: 10,
    },
    curlyBorder: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        width: '90%',
        fontWeight: 'bold',
    },
    introText: {
        fontSize: 16,
        fontWeight: 'bold',
        flexShrink: 1,
    },
    label: {
        fontSize: 18,
        marginBottom: 10,
    },
    buttonContainer: {
        margin: 10,
        width: '70%',
    },
    inputContainer: {
        margin: 10,
        width: '90%',
    },
    textInput: {
        height: 100,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        textAlignVertical: 'top',
    },
    charCount: {
        textAlign: 'right',
        marginTop: 5,
        color: 'gray',
    },
    iconRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        width: "100%",
        paddingHorizontal: 10,
    },
});
