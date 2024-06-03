import { View, Text } from 'react-native';
import LoginPage from './pages/loginPage';
import HomeScreen from './app/pages/homeScreen';

export default function index() {
  return (
    <View>
      <HomeScreen />
    </View>
  );
}