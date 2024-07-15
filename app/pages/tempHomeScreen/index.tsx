import { StyleSheet, View, ScrollView, FlatList, Text, Modal } from "react-native";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ShopCondensedInfo from "@/app/components/ShopCondensedInfo";
import PageBreakLine from "@/components/PageBreakLine";
import InputBoxWithOptionalTitle from "@/components/InputBoxWithTitle";
import Navbar from "@/components/Navbar";
import LinkIconButtonWithOptionalText from "@/components/LinkIconButtonWithOptionalText";
import Button from "@/components/Button";
import FilterModal from "@/components/filterModal";
import axios from "axios";

type Restaurant = {
  id: number;
  storeName: string;
  storeAddress: string;
  storeStatus: string;
  storeClassification: string;
  storeRating: string;
  storeDist: string;
  averageRating: number | null; // Added this field. For some restaurants where there are no reviews added, there would be no average rating, hence the null value
};


export default function TempHomeScreen() {

    const [keywords, updateKeywords] = useState('');
    
    const [restaurants, update] = useState<Restaurant[]>([]);

    const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]); // State for filtered restaurants
    
    const handleSearch = () => {
        console.log(`searching for ${keywords}`);
    }
    
    const handleFilter = () => {
      setFilterModalVisible(true);
    };

    const [loading, setLoading] = useState(true);
    const [filterModalVisible, setFilterModalVisible] = useState(false);

    const weibinURL = 'http://192.168.1.71:4200/restaurants'

    const fetchAverageRatingUrlWeiBin = (id: number) => `http://192.168.1.71:4200/averageRating?restaurantID=${id}`;

    const fetch = () => {
    axios.get("http://10.0.2.2:4200/restaurants")
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
            update(restaurantsWithRatings);
            setFilteredRestaurants(restaurantsWithRatings); // Initialize with all restaurants
            setLoading(false); // Set loading to false after data is fetched
            console.log(restaurantsWithRatings);
          })
          .catch(error => {
            console.error("Error fetching average ratings", error);
            setLoading(false); // Set loading to false in case of error
          });
      })
      .catch(error => {
        console.error("oops", error);
        setLoading(false); // Set loading to false in case of error
      });
  };
  
    // Added this
    useEffect(() => {
      fetch();
    }, []);

    // Filter function
    const filterRestaurants = (keyword: string) => {
      if (!keyword) {
        setFilteredRestaurants(restaurants); // If no keyword, show all restaurants
      } else {
        const filtered = restaurants.filter(restaurant =>
          restaurant.storeName.toLowerCase().startsWith(keyword.toLowerCase())
        );
        setFilteredRestaurants(filtered);
      }
    }
  
    // Handle text input changes
    const handleKeywordChange = (text: string) => {
      updateKeywords(text);
      filterRestaurants(text);
    }

    const handleApplyFilters = (filters: any) => {
      const { distance, storeName, storeClassification, rating } = filters;
      let filtered = restaurants;
  
      if (distance) {
        //filtered = filtered.filter(restaurant => restaurant.storeDist.toLowerCase().includes(distance.toLowerCase()));
        filtered = filtered.filter(restaurant => restaurant.storeDist <= distance);
      }
      if (storeName) {
        //filtered = filtered.filter(restaurant => restaurant.storeName.toLowerCase().includes(storeName.toLowerCase()));
        filtered = filtered.filter(restaurant => restaurant.storeName.toLowerCase().startsWith(storeName.toLowerCase()));
      }
      if (storeClassification) {
        filtered = filtered.filter(restaurant => restaurant.storeClassification.toLowerCase().includes(storeClassification.toLowerCase()));
        //filtered = filtered.filter(restaurant => restaurant.storeClassification.toLowerCase().startsWith(storeClassification.toLowerCase()));
      }
      if (rating) {
        //filtered = filtered.filter(restaurant => restaurant.averageRating && restaurant.averageRating >= parseFloat(rating));
        filtered = filtered.filter(restaurant => restaurant.averageRating && restaurant.averageRating >= rating);
      }
  
      setFilteredRestaurants(filtered);
    }

    return (

      // To check if my app is actually connected to the server

      /*<View>
          <Text>restaurants</Text>
          <Button text="fetch" border='rounded' fn={fetch} />
          <Text>help</Text>
      </View>*/

    <View style={styles.container}>
            
        <Header header='FoodBuster' />
            <PageBreakLine style="solid" />

            <View style={styles.searchBar}>
                <View style={{width: '80%'}}>
                <InputBoxWithOptionalTitle updaterFn={handleKeywordChange} placeholder='Search By Store Name' />
                </View>
                <LinkIconButtonWithOptionalText iconName="search1" fn={() => filterRestaurants(keywords)} />
                
                <LinkIconButtonWithOptionalText iconName="filter" fn={() => setFilterModalVisible(true)} />
            </View>
            
            
            <ScrollView>
                {loading ? ( // Conditional rendering based on loading state
                    <Text>Loading...</Text>
                ) : (
                  filteredRestaurants.map(restaurant => (
                        <ShopCondensedInfo
                            key={restaurant.id} // Ensure unique key prop
                            id={restaurant.id} // Pass the id to ShopCondensedInfo
                            storeName={restaurant.storeName}
                            storeDist={restaurant.storeDist.toString()}
                            storeAddress={restaurant.storeAddress}
                            storeRating={restaurant.averageRating !== null ? restaurant.averageRating.toFixed(1) : 'No Rating'} // Handle null value
                            storeStatus={restaurant.storeStatus}
                            storeClassification={restaurant.storeClassification}
                        />
                    ))
                )}
                
            </ScrollView>
            <Navbar />

            {/* Filter Modal */}
            <FilterModal
              visible={filterModalVisible}
              onClose={() => setFilterModalVisible(false)}
              onApply={handleApplyFilters}
            />

        </View>

    )

}

/*
<Modal
                transparent={true}
                visible={filterModalVisible}
                animationType="slide"
                onRequestClose={() => setFilterModalVisible(false)}
              >
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Filter Options</Text>
                    {}
                    <Button text="Close" border='rounded' fn={() => setFilterModalVisible(false)} />
                  </View>
                </View>
            </Modal>
*/

// Previously
// <LinkIconButtonWithOptionalText iconName="filter" fn={handleFilter} />

const styles1 = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    restaurantItem: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    restaurantName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    restaurantAddress: {
      fontSize: 16,
    },
    restaurantStatus: {
      fontSize: 14,
      color: 'green',
    },
  });

const styles = StyleSheet.create({
    searchBar: {
        width: '100%',
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }, 
    container: {
        flex: 1,
        paddingHorizontal: 5,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      width: '80%',
      padding: 20,
      backgroundColor: 'white',
      borderRadius: 10,
      alignItems: 'center',
    },
    modalTitle: {
      fontSize: 20,
      marginBottom: 20,
    },
})
