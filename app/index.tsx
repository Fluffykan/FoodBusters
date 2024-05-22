import { View, Text } from 'react-native';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';
import ProfilePage from './pages/profilePage';

export default function index() {
  return (
    <View>
      <ProfilePage />
    </View>
  );
}