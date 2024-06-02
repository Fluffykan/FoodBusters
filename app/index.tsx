
import HomePage from './pages/homePage';
import CreateAccountPage from './pages/createAccount';
import LoginPage from './pages/loginPage';
import ProfilePage from './pages/profilePage';

import { StyleSheet, View, Text, Image, Button, TouchableOpacity, Pressable } from "react-native";
import { useState } from "react";
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';


import TopButtonPlusHeader from "../app/stallscreen/components/topButtonPlusHeader/topButtonPlusHeader";
import StallNamePlusButtons from "./stallscreen/components/stallNamePlusButtons/stallNamePlusButtons";
import AddressPlusButtons from "./stallscreen/components/addressPlusButtons/addressPlusButtons";
import ReviewsComponent from "./stallscreen/components/reviewsComponent/reviewsComponent";

export default function index() {

  const overallStyle = StyleSheet.create({
      container: {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          flex: 1, 
          padding: 0,
          paddingHorizontal: 20
      }
  });

  const horizontalline = StyleSheet.create({
      container: {
          width: '100%',
          height: 3,
          backgroundColor: 'black',
          marginVertical: 10,
      }
  })

  const filterImageEdit = StyleSheet.create({
      container: {
          height: 30,
          width: 30
      }
  })

  const filterandSearchIconEdit = StyleSheet.create({
      container: {
          borderWidth: 2,
          borderRadius: 8,
          justifyContent: "space-between",
          flexDirection: "row",
          width: "100%",
          alignItems: 'center',
      }
  })

  const filterTextEdit = StyleSheet.create({
      container: {
          alignItems: 'center',
          fontSize: 25,
          position: 'relative',
          justifyContent: 'center',
      }
  })

  const bottomButtons = StyleSheet.create({
      container: {
          flexDirection: "row",
          paddingHorizontal: 50,
          marginHorizontal: 50,
          justifyContent: 'space-between',
          width: "100%"
      }
  });

  const homeTextEdit = StyleSheet.create({
      container: {
          fontSize: 18
      }
  })

  const myWalletTextEdit = StyleSheet.create({
      container: {
          fontSize: 18
      }
  })

  const foodOfTheDayTextEdit = StyleSheet.create({
      container: {
          fontSize: 18
      }
  })

  const profileTextEdit = StyleSheet.create({
      container: {
          fontSize: 18
      }
  })

  const [homeButtonIsPressed, sethomeButtonIsPressed] = useState(false)
  const toggleHomeButton = () => {
      sethomeButtonIsPressed(!homeButtonIsPressed);
      console.log("Redirecting to HomePage...");
  }

  const [walletButtonIsPressed, setwalletButtonIsPressed] = useState(false)
  const toggleMyWalletButton = () => {
      setwalletButtonIsPressed(!walletButtonIsPressed);
      console.log("Redirecting to My Wallet Page...")
  }

  const [FOTDButtonIsPressed, setFOTDButtonIsPressed] = useState(false)
  const toggleFOTDButton = () => {
      setFOTDButtonIsPressed(!FOTDButtonIsPressed);
      console.log("Redirecting to FOTD Page");
  }

  const [profileButtonIsPressed, setprofileButtonIsPressed] = useState(false)
  const toggleProfileButton = () => {
      setprofileButtonIsPressed(!profileButtonIsPressed)
      console.log("Redirecting to Profile Page...")
  }

  const [writeReviewButtonIsPressed, setwriteReviewButtonIsPressed] = useState(false)
  const toggleReviewButton = () => {
      setwriteReviewButtonIsPressed(!writeReviewButtonIsPressed)
      console.log("Writing Your Review")
  }

  const [filterReviewButtonIsPressed, setReviewButtonIsPressed] = useState(false)
  const togglefilterReviewButton = () => {
      setReviewButtonIsPressed(!filterReviewButtonIsPressed)
      console.log("Reviewing...")
  }

  return (
      
      <View style={overallStyle.container}>

          <View><TopButtonPlusHeader></TopButtonPlusHeader></View>

          <Image style={{height:"40%", width:"100%"}}
             source={{ uri: 'https://singaporebeauty.com/wp-content/uploads/2021/10/la-jiang-shan-selegie-dhoby-ghaut-orchard-buffet.jpg' }} />


          <View><StallNamePlusButtons></StallNamePlusButtons></View>
          
          <View style={horizontalline.container}></View>

          <View><AddressPlusButtons></AddressPlusButtons></View>
          
          <View style={horizontalline.container}></View>

          <View>
              <TouchableOpacity onPress={toggleReviewButton}>
                  <View style={filterandSearchIconEdit.container}>
                      <Text style={filterTextEdit.container}>Filter Reviews</Text>
                      <Icon name="search1" size={30} color="black" />
                  </View>
              </TouchableOpacity>

              <ReviewsComponent></ReviewsComponent>
              
          </View>

          <View style={horizontalline.container}></View>

          <View style={bottomButtons.container}> 
              
              <View>
                  <Link href={"homeScreen/homescreen"}>
                      <Icon name="home" size={50} color="black" />
                  </Link>
                  <Text style={homeTextEdit.container}>Home</Text>
              </View>
                  
              <View>
                  <Link href="walletScreen/wallet">
                      <Icon name="wallet" size={50} color="black" />
                  </Link>
                  <Text style={myWalletTextEdit.container}>Wallet</Text>
              </View>

              <View>
                  <Link href={"foodOfTheDayScreen/foodOfTheDay"}>
                      <Icon name="star" size={50} color="black" />
                  </Link>
                  <Text style={foodOfTheDayTextEdit.container}>FOTD</Text>
              </View>

              <TouchableOpacity onPress={toggleProfileButton}>
                  <Icon name="profile" size={50} color="black" />
                  <Text style={profileTextEdit.container}>Profile</Text> 
              </TouchableOpacity>
          </View>
          
      </View>
  );
}