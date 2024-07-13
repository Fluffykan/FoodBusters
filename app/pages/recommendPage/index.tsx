import { StyleSheet, View, ScrollView, Text } from "react-native";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import InputBoxWithOptionalTitle from "@/components/InputBoxWithTitle";
import Navbar from "@/components/Navbar";
import LinkIconButtonWithOptionalText from "@/components/LinkIconButtonWithOptionalText";
import axios from "axios";
import UserCondensedInfo from "@/app/components/UserCondensedInfo";
import FilterModal from "@/components/filterModal"; 
import UserFilterModal from "@/components/userFilterModal";

// Should fetch all user info here.
// Showcases a list of user condensed info
// userCondensedInfo consists of 
// Left side is a profile picture of the user
// 1) Username 2) User preferences
// Next, user need to be able to indicate their preference
// Next, users can upvote great recommendations
// Filter by username + the type of food they want to recommend

type User = {
    id: number;
    username: string;
    preference: string;
    userrank: string;
  };
  
  export default function RecommendPage() {
    const [keywords, updateKeywords] = useState('');
    const [users, updateUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterModalVisible, setFilterModalVisible] = useState(false);
  
    const weibinURL = 'http://192.168.1.71:4200/users'; // Replace with your actual endpoint
  
    const fetchUsers = () => {
      axios.get(weibinURL)
        .then(response => {
          const fetchedUsers = response.data;
          updateUsers(fetchedUsers);
          setFilteredUsers(fetchedUsers); // Initialize with all users
          setLoading(false); // Set loading to false after data is fetched
          console.log(fetchedUsers);
        })
        .catch(error => {
          console.error("Error fetching users", error);
          setLoading(false); // Set loading to false in case of error
        });
    };
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    // Filter function based on username, preference, and userrank
    const filterUsers = (keyword: string) => {
        if (!keyword) {
        setFilteredUsers(users); // If no keyword, show all users
        } else {
        const filtered = users.filter(user =>
            user.username.toLowerCase().startsWith(keyword.toLowerCase()) ||
            user.preference.toLowerCase().includes(keyword.toLowerCase()) ||
            user.userrank.toLowerCase().includes(keyword.toLowerCase())
        );
        setFilteredUsers(filtered);
        }
    }
  
    // Handle text input changes
    const handleKeywordChange = (text: string) => {
      updateKeywords(text);
      filterUsers(text);
    }
  
    // Apply filters from userFilterModal
    const handleApplyUserFilters = (filters: any) => {
        const { username, preference, userrank } = filters;
        let filtered = users;

        if (username) {
        filtered = filtered.filter(user => user.username.toLowerCase().includes(username.toLowerCase()));
        }
        if (preference) {
        filtered = filtered.filter(user => user.preference.toLowerCase().includes(preference.toLowerCase()));
        }
        if (userrank) {
        filtered = filtered.filter(user => user.userrank.toLowerCase().includes(userrank.toLowerCase()));
        }

        setFilteredUsers(filtered);
    }
  
    return (
      <View style={styles.container}>
        <Header header='FoodBuster' />
        <View style={styles.searchBar}>
          <View style={{width: '80%'}}>
            <InputBoxWithOptionalTitle updaterFn={handleKeywordChange} placeholder='Search By Username' />
          </View>
          <LinkIconButtonWithOptionalText iconName="search1" fn={() => filterUsers(keywords)} />
          <LinkIconButtonWithOptionalText iconName="filter" fn={() => setFilterModalVisible(true)} />
        </View>
  
        <ScrollView>
          {loading ? ( // Conditional rendering based on loading state
            <Text>Loading...</Text>
          ) : (
            filteredUsers.map(user => (
              <UserCondensedInfo
                key={user.id} // Ensure unique key prop
                username={user.username}
                preference={user.preference}
                rank={user.userrank}
              />
            ))
          )}
        </ScrollView>
        <Navbar />
  
        {/* Filter Modal */}
        <UserFilterModal
          visible={filterModalVisible}
          onClose={() => setFilterModalVisible(false)}
          onApply={handleApplyUserFilters}
        />
      </View>
    );
  }
  
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
  });