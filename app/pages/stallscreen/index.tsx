import { StyleSheet, View, Text, Image, Button, TouchableOpacity, Pressable, ScrollView, TextInput } from "react-native";
import { useState } from "react";
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';


import TopButtonPlusHeader from '@/components/TopButtonPlusHeader';
import StallNamePlusButtons from './components/stallNamePlusButtons';
import AddressPlusButtons from './components/addressPlusButtons';
import ReviewsComponent from './components/reviewsComponent';
import PageBreakLine from "@/components/PageBreakLine";
import Navbar from "@/components/Navbar";
import LinkIconButtonWithOptionalText from "@/components/LinkIconButtonWithOptionalText";

export default function StallScreen() {

  const [keywords, changeKeywords] = useState('');

  // TO BE FETCHED USING API
  const stallName = "La Jiang Shan";
  const operating = true;
  const address = '123 tangy street';
  const rating = 5;
  const foodType = 'hotpot'

  const handleFilterReviews = (keywords:string) => {
    console.log(`filtering reviews with: ${keywords}`);
  }


  return (
    <>
        <TopButtonPlusHeader header='FoodBuster' />

      <ScrollView style={styles.container}>
                <Image style={{height:200, width:"100%"}}
                    source={{ uri: 'https://singaporebeauty.com/wp-content/uploads/2021/10/la-jiang-shan-selegie-dhoby-ghaut-orchard-buffet.jpg' }} />
                <StallNamePlusButtons stallName={stallName} />
                <PageBreakLine style='solid' />
                <AddressPlusButtons operating={operating} address={address} rating={rating} foodType={foodType} />
                <PageBreakLine style='solid' />
                <View style={styles.searchBarContainer}>
                    <TextInput placeholder="Search Reviews" onChangeText={changeKeywords} style={styles.textInput}></TextInput>
                    <LinkIconButtonWithOptionalText iconName="search1" fn={() => handleFilterReviews(keywords)} />
                </View>
                <ReviewsComponent />
                <ReviewsComponent />
                <ReviewsComponent />
                <ReviewsComponent />
                <ReviewsComponent />
                <ReviewsComponent />
                <ReviewsComponent />

          
      </ScrollView>
      <Navbar />

      </>
  );
}

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