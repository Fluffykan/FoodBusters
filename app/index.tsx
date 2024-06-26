import { View, StyleSheet, Text, ScrollView } from 'react-native';
import Wallet from './pages/walletScreen';
import HomeScreen from './pages/homeScreen';
import ProfileNavBar from './pages/profilePage/components/profileNavBar';
import ProfilePage from './pages/profilePage';
import LinkIconButtonWithOptionalText from '@/components/LinkIconButtonWithOptionalText';
import NavIconButtonWithOptionalText from '@/components/NavIconButtonWithOptionalText';
import InputBoxWithOptionalTitle from '@/components/InputBoxWithTitle';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import LoginPage from './pages/loginPage';
import ReviewsComponent from './pages/stallscreen/components/reviewsComponent';
import StallNamePlusButtons from './pages/stallscreen/components/stallNamePlusButtons';
import StallScreen from './pages/stallscreen';
import TempHomeScreen from './pages/tempHomeScreen';
import Upload from './pages/writeReviewPage/components/imagePicker';
import WriteReviewPage from './pages/writeReviewPage';
import RandomRec from './pages/randomRec';
import ShopCondensedInfo from './components/ShopCondensedInfo';

export default function index() {

    return (
        <LoginPage/>
    )
}

