import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Header from '@/components/Header';
import Navbar from '@/components/Navbar';
import Button from '@/components/Button';
import ShopCondensedInfo from '@/app/components/ShopCondensedInfo';
import InputBoxWithOptionalTitle from '@/components/InputBoxWithTitle';
import LinkIconButtonWithOptionalText from '@/components/LinkIconButtonWithOptionalText';
import FilterModal from '@/components/filterModal';
import PageBreakLine from '@/components/PageBreakLine';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import ShopCondensedInfoWithTickBox from '@/app/components/ShopCondensedInfoWithTickBox';

// There should be a limit of how many shops you can recommend. (Implement a cooldown function && perhaps a limit of 8 stores to recommend)

type Restaurant = {
  id: number;
  storeName: string;
  storeAddress: string;
  storeStatus: string;
  storeClassification: string;
  storeRating: string;
  storeDist: string;
  averageRating: number | null;
};

export default function RecommendToUserPage() {
  const { userid: recommendToUserId, username, preference, userrank } = useLocalSearchParams(); // recommendTo user details
  const [keywords, setKeywords] = useState('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedRestaurants, setSelectedRestaurants] = useState<number[]>([]);

  const weibinURL = 'http://192.168.1.71:4200/restaurants';
  const fetchAverageRatingUrlWeiBin = (id: number) => `http://192.168.1.71:4200/averageRating?restaurantID=${id}`;

  const weibinURLUser = 'http://192.168.1.71:4200/getUserCreds'

  const [userId, setUserId] = useState(""); // recommendBy user details
  const [usernameBy, setUsername] = useState("");
  const [rank, setRank] = useState("");
  const [preferenceBy, setPreference] = useState("");

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

  // For the original

  const fetchRestaurants = () => {
    axios.get<Restaurant[]>('http://10.0.2.2:4200/restaurants')
      .then(response => {
        const fetchedRestaurants = response.data;
        const fetchRatingsPromises = fetchedRestaurants.map((restaurant: Restaurant) =>
          axios.get(`http://10.0.2.2:4200/averageRating?restaurantID=${restaurant.id}`).then(res => ({
            ...restaurant,
            averageRating: res.data.averageRating
          }))
        );
        Promise.all(fetchRatingsPromises)
          .then(restaurantsWithRatings => {
            setRestaurants(restaurantsWithRatings);
            setFilteredRestaurants(restaurantsWithRatings); // Initialize with all restaurants
            setLoading(false);
          })
          .catch(error => {
            console.error("Error fetching average ratings", error);
            setLoading(false);
          });
      })
      .catch(error => {
        console.error("Error fetching restaurants", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    console.log("loading");
    fetchRestaurants();
    getUserData(); 
  }, [loading]);

  const filterRestaurants = (keyword: string) => {
    const filtered = restaurants.filter(restaurant =>
      restaurant.storeName.toLowerCase().startsWith(keyword.toLowerCase())
    );
    setFilteredRestaurants(filtered);
  };

  const handleKeywordChange = (text: string) => {
    setKeywords(text);
    filterRestaurants(text);
  };

  const handleApplyFilters = (filters: any) => {
    const { distance, storeName, storeClassification, rating } = filters;
    let filtered = restaurants;

    if (distance) {
      filtered = filtered.filter(restaurant => restaurant.storeDist <= distance);
    }
    if (storeName) {
      filtered = filtered.filter(restaurant => restaurant.storeName.toLowerCase().startsWith(storeName.toLowerCase()));
    }
    if (storeClassification) {
      filtered = filtered.filter(restaurant => restaurant.storeClassification.toLowerCase().includes(storeClassification.toLowerCase()));
    }
    if (rating) {
      filtered = filtered.filter(restaurant => restaurant.averageRating && restaurant.averageRating >= rating);
    }

    setFilteredRestaurants(filtered);
  };

  const handleConfirmRecommendation = async () => {
    try {
      const recommendations = selectedRestaurants.map(stallid => {
        const restaurant = restaurants.find(r => r.id === stallid);
        
        if (!restaurant) {
          throw new Error(`Restaurant with id ${stallid} not found`);
        }
  
        return {
          recommendby: userId,
          recommendto: recommendToUserId,
          stallid,
          username: usernameBy,
          userrank: rank,
          storeDist: restaurant.storeDist,
          storeClassification: restaurant.storeClassification,
          storeStatus: restaurant.storeStatus,
          storeName: restaurant.storeName,
          storeAddress: restaurant.storeAddress,
          storeRating: restaurant.averageRating !== null ? restaurant.averageRating.toFixed(2) : '0.00'
        };
      });
  
      await axios.post('http://10.0.2.2:4200/recommendations', { recommendations });
      alert('Recommendations confirmed!');
    } catch (error) {
      console.error('Error confirming recommendations', error);
      alert('Error confirming recommendations');
    }
  };
  
  


  const handleRestaurantSelection = (restaurantId: number, isSelected: boolean) => {
    setSelectedRestaurants(prevSelected => 
      isSelected ? [...prevSelected, restaurantId] : prevSelected.filter(id => id !== restaurantId)
    );
  };

  return (
    <View style={styles.container}>
      <Header header='FoodBuster' />
      <PageBreakLine style="solid" />
      <View style={styles.userInfo}>
        <Text style={styles.title}>What do you wish to recommend to :</Text>
        <View style={styles.profile}>
          <Text style={styles.userNameOnly}>{username}</Text>
          {/* Profile icon */}
          <Icon name="user-circle" size={30} color="black" />
        </View>
        <Text style={styles.info}>Preference: {preference}</Text>
        <Text style={styles.info}>Rank: {userrank}</Text>
      </View>

      <PageBreakLine style="solid" />

      <View style={styles.searchBar}>
        <View style={{ width: '80%' }}>
          <InputBoxWithOptionalTitle updaterFn={handleKeywordChange} placeholder='Search By Store Name' />
        </View>
        <LinkIconButtonWithOptionalText iconName="search1" fn={() => filterRestaurants(keywords)} />
        <LinkIconButtonWithOptionalText iconName="filter" fn={() => setFilterModalVisible(true)} />
      </View>

      <ScrollView>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          filteredRestaurants.map(restaurant => (
            <ShopCondensedInfoWithTickBox
              key={restaurant.id}
              id={restaurant.id}
              storeName={restaurant.storeName}
              storeDist={restaurant.storeDist.toString()}
              storeAddress={restaurant.storeAddress}
              storeRating={restaurant.averageRating !== null ? restaurant.averageRating.toFixed(1) : 'No Rating'}
              storeStatus={restaurant.storeStatus}
              storeClassification={restaurant.storeClassification}
              onSelectionChange={handleRestaurantSelection}
            />
          ))
        )}
      </ScrollView>

      <View style={styles.confirmButtonContainer}>
        <Button
          text="Confirm Recommendation"
          bgColor="#6B8EAE" // Blue color
          border='rounded'
          fn={handleConfirmRecommendation}
        />
      </View>

      <Navbar />

      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onApply={handleApplyFilters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
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
  userNameOnly: {
    fontSize: 30,
    paddingHorizontal: 5,
  },
  userInfo: {
    marginBottom: 10,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBar: {
    width: '100%',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  confirmButtonContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
});
