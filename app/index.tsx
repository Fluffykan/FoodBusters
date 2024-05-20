import { View, Text } from 'react-native';
import LoginPage from './pages/loginPage';
import HomePage from './pages/homePage';

export default function index() {
  return (
    <View>
      <LoginPage />
    </View>
  );
}