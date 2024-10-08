import { StyleSheet, View, ScrollView, Text } from "react-native";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import InputBoxWithOptionalTitle from "@/components/InputBoxWithTitle";
import Navbar from "@/components/Navbar";
import LinkIconButtonWithOptionalText from "@/components/LinkIconButtonWithOptionalText";
import axios from "axios";
import RecommendedCondensedInfo from "@/app/components/RecommendedCondensedInfo";
import PageBreakLine from "@/components/PageBreakLine";
import RecommendFilterModal from "@/components/RecommendFilterModal";

type Recommendation = {
    id: number;
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

    const [userId, setUserId] = useState(""); // User details
    const [usernameBy, setUsername] = useState("");
    const [rank, setRank] = useState("");
    const [preferenceBy, setPreference] = useState("");
    const [loading, setLoading] = useState(true);
    const [recommendData, setRecommendData] = useState<Recommendation[]>([]);
    const [filteredRecommendData, setFilteredRecommendData] = useState<Recommendation[]>([]);
    const [keywords, setKeywords] = useState("");
    const [filterModalVisible, setFilterModalVisible] = useState(false); // State for filter modal visibility

    const getUserData = async () => {
        try {
            const response = await axios.get('http://10.0.2.2:4200/getUserCreds');
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
            const response = await axios.get(`http://10.0.2.2:4200/getUserRecommendations?userId=${userId}`);
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
    }, [userId, recommendData]);

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

    const handleApplyFilters = (filters: any) => {
        const { distance, storeName, storeClassification, rating, username, userrank } = filters;
        let filtered = recommendData;
    
        if (distance) {
          filtered = filtered.filter(recommendation => recommendation.storeDist <= distance);
        }
        if (storeName) {
          filtered = filtered.filter(recommendation => recommendation.storeName.toLowerCase().startsWith(storeName.toLowerCase()));
        }
        if (storeClassification) {
          filtered = filtered.filter(recommendation => recommendation.storeClassification.toLowerCase().includes(storeClassification.toLowerCase()));
        }
        if (rating) {
          filtered = filtered.filter(recommendation => recommendation.storeRating && recommendation.storeRating >= rating);
        }
        if (username) {
          filtered = filtered.filter(recommendation => recommendation.username.toLowerCase().startsWith(username.toLowerCase()));
        }
        if (userrank) {
          filtered = filtered.filter(recommendation => recommendation.userrank.toLowerCase().startsWith(userrank.toLowerCase()));
        }
    
        setFilteredRecommendData(filtered);
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
                <LinkIconButtonWithOptionalText iconName="filter" fn={() => setFilterModalVisible(true)} />
            </View>

            <ScrollView>
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    filteredRecommendData.map(recommendation => (
                        <RecommendedCondensedInfo
                            key={recommendation.id} // Ensure unique key prop
                            recommendId={recommendation.id}
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
            <RecommendFilterModal
                visible={filterModalVisible}
                onClose={() => setFilterModalVisible(false)}
                onApply={handleApplyFilters}
            />
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