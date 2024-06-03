import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Wallet from './pages/walletScreen';
import HomeScreen from './pages/homeScreen';
import ProfileNavBar from './pages/profilePage/components/profileNavBar';
import ProfilePage from './pages/profilePage';
import LinkIconButtonWithOptionalText from '@/components/LinkIconButtonWithOptionalText';
import NavIconButtonWithOptionalText from '@/components/NavIconButtonWithOptionalText';

export default function index() {
    return (
        <ProfilePage/>

    );
}

