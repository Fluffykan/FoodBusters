import { StyleSheet, View, ScrollView, Text } from "react-native";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import InputBoxWithOptionalTitle from "@/components/InputBoxWithTitle";
import Navbar from "@/components/Navbar";
import LinkIconButtonWithOptionalText from "@/components/LinkIconButtonWithOptionalText";
import axios from "axios";
import RecommendedCondensedInfo from "@/app/components/RecommendedCondensedInfo";
import PageBreakLine from "@/components/PageBreakLine";

type Recommendation = {
    stallid: number;
    storeName: string;
    storeAddress: string;
    storeStatus: string;
    storeClassification: string;
    storeRating: string;
    storeDist: string;
    username: string;
    userrank: string;
};


export default function CheckRecommendedFood() {

    const weibinURLUser = 'http://192.168.1.71:4200/getUserCreds'; // The user data of the current user that logged in
    const weibinURLRecommend = 'http://192.168.1.71:4200/getUserRecommendations'; // Gets all the entry details of all food recommendations w.r.t to current user

    const [userId, setUserId] = useState(""); // User details
    const [usernameBy, setUsername] = useState("");
    const [rank, setRank] = useState("");
    const [preferenceBy, setPreference] = useState("");
    const [loading, setLoading] = useState(true);
    const [recommendData, setRecommendData] = useState<Recommendation[]>([]);
    const [filteredRecommendData, setFilteredRecommendData] = useState<Recommendation[]>([]);
    const [keywords, setKeywords] = useState("");

    const getUserData = async () => {
        try {
            const response = await axios.get(weibinURLUser);
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

    const getRecommendations = async () => {
        try {
            const response = await axios.get(`${weibinURLRecommend}?userId=${userId}`);
            const data : Recommendation[] =  response.data;
            setRecommendData(data);
            setFilteredRecommendData(data);
        } catch (error) {
            console.error(error);
        }
    }

    
    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
        if (userId) {
            getRecommendations();
        }
    }, [userId]);

    const handleKeywordChange = (text: string) => {
        setKeywords(text);
        filterRecommendations(text);
    };

    const filterRecommendations = (keyword: string) => {
        if (!keyword) {
            setFilteredRecommendData(recommendData); // If no keyword, show all recommendations
        } else {
            const filtered = recommendData.filter(recommendation =>
                recommendation.storeName.toLowerCase().startsWith(keyword.toLowerCase())
            );
            setFilteredRecommendData(filtered);
        }
    };

    return (
        <View style={styles.container}>
            <Header header='FoodBuster' />
            <PageBreakLine style="solid" />
            <View style={styles.searchBar}>
                <View style={{width: '80%'}}>
                    <InputBoxWithOptionalTitle updaterFn={handleKeywordChange} placeholder='Search By Store Name' />
                </View>
                <LinkIconButtonWithOptionalText iconName="search1" fn={() => filterRecommendations(keywords)} />
            </View>

            <ScrollView>
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    filteredRecommendData.map(recommendation => (
                        <RecommendedCondensedInfo
                            key={recommendation.stallid} // Ensure unique key prop
                            id={recommendation.stallid}
                            storeName={recommendation.storeName}
                            storeDist={recommendation.storeDist}
                            storeAddress={recommendation.storeAddress}
                            storeRating={recommendation.storeRating}
                            storeStatus={recommendation.storeStatus}
                            storeClassification={recommendation.storeClassification}
                            username={recommendation.username}
                            userrank={recommendation.userrank}
                        />
                    ))
                )}
            </ScrollView>
            <Navbar />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    searchBar: {
        width: '100%',
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }, 
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    info: {
        fontSize: 16,
        marginVertical: 5,
    },
    userInfo: {
        marginBottom: 10,
    },
    recommendList: {
        flex: 1,
    },
    recommendItem: {
        marginVertical: 5,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
    },
});