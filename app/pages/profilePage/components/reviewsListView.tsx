import axios from 'axios';
import { useSegments } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export default function ReviewsListView(email:string) {
    const data = axios.get(`http://10.0.2.2:4200/getUserReviews/${email}`);

    return (
        <View>
            <Text>reviews</Text>
        </View>
    )
}