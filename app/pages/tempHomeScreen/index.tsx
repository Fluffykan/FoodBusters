import { StyleSheet, View, ScrollView, FlatList, Text } from "react-native";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ShopCondensedInfo from "@/app/components/ShopCondensedInfo";
import PageBreakLine from "@/components/PageBreakLine";
import InputBoxWithOptionalTitle from "@/components/InputBoxWithTitle";
import Navbar from "@/components/Navbar";
import LinkIconButtonWithOptionalText from "@/components/LinkIconButtonWithOptionalText";
import Button from "@/components/Button";
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
        console.log('open filter dropdown');
    }

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const url = "http://192.168.1.72:4200/restaurants";
    const fetchAverageRatingUrl = (id: number) => `http://192.168.1.72:4200/averageRating?restaurantID=${id}`;

    /*const fetch = () => {
      axios.get(url)
      .then(response => {
          update(response.data);
          setFilteredRestaurants(response.data); // Initialize with all restaurants
          setLoading(false); // Set loading to false after data is fetched
          console.log(response.data);
      })
      .catch(error => {
          console.error("oops", error);
          setLoading(false); // Set loading to false in case of error
      })
    }*/

      // What's the difference between these 2 codes for fetching data ?
    const fetch = () => {
    axios.get(url)
      .then(response => {
        const fetchedRestaurants = response.data;
        const fetchRatingsPromises = fetchedRestaurants.map((restaurant: Restaurant) =>
          axios.get(fetchAverageRatingUrl(restaurant.id)).then(res => ({
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

    return (

      // To check if my app is actually connected to the server

      /*<View>
          <Text>restaurants</Text>
          <Button text="fetch" border='rounded' fn={fetch} />
          <Text>help</Text>
      </View>*/

            
      // For some reason after removing the commenting feature for the top part, and commenting it again. The database information
      // Could be displayed, but with an error recorded in the console => 
      // Each child in the list should have a unique "key" prop
      // Resolved => Missing incrementing primary key in database
    <View style={styles.container}>
            
        <Header header='FoodBuster' />
            <PageBreakLine style="solid" />

            <View style={styles.searchBar}>
                <View style={{width: '80%'}}>
                <InputBoxWithOptionalTitle updaterFn={handleKeywordChange} placeholder='Search' />
                </View>
                <LinkIconButtonWithOptionalText iconName="search1" fn={() => filterRestaurants(keywords)} />
                <LinkIconButtonWithOptionalText iconName="filter" fn={handleFilter} />
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
        </View>

    )

}

// Changed restaurants.map() to

/*

{restaurants.map(restaurant => (
                    <ShopCondensedInfo
                        key={restaurant.id}
                        storeName={restaurant.storeName}
                        storeDist={restaurant.storeDist.toString()}
                        storeAddress={restaurant.storeAddress}
                        storeRating={restaurant.storeRating.toString()}
                        storeStatus={restaurant.storeStatus}
                        storeClassification={restaurant.storeClassification}
                    />
                ))}       
*/                

// Previous code
/*
<View style={styles.container}>
            
        <Header header='FoodBuster' />
            <PageBreakLine style="solid" />

            <View style={styles.searchBar}>
                <View style={{width: '80%'}}>
                <InputBoxWithOptionalTitle updaterFn={updateKeywords} placeholder='Search' />
                </View>
                <LinkIconButtonWithOptionalText iconName="search1" fn={handleSearch} />
                <LinkIconButtonWithOptionalText iconName="filter" fn={handleFilter} />
            </View>
            
            
            <ScrollView>
                {loading ? ( // Conditional rendering based on loading state
                    <Text>Loading...</Text>
                ) : (
                  filteredRestaurants.map(restaurant => (
                        <ShopCondensedInfo
                            key={restaurant.id} // Ensure unique key prop
                            storeName={restaurant.storeName}
                            storeDist={restaurant.storeDist.toString()}
                            storeAddress={restaurant.storeAddress}
                            storeRating={restaurant.storeRating.toString()}
                            storeStatus={restaurant.storeStatus}
                            storeClassification={restaurant.storeClassification}
                        />
                    ))
                )}
                
                
                
            </ScrollView>
            <Navbar />
        </View>
*/



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
    }
})
