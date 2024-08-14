import { View, StyleSheet } from 'react-native';
import Header from './Header';
import NavIconButtonWithOptionalText from './NavIconButtonWithOptionalText';
import Icon from 'react-native-vector-icons/AntDesign';

type TopButtonPlusHeaderProps = {
    header: string;
    transparentBg?: boolean;
    destination: string;
    replaceScreen: boolean;
}

export default function TopButtonPlusHeader({header, transparentBg, destination, replaceScreen}:TopButtonPlusHeaderProps) {
    const bgColor = transparentBg ? 'none' : 'white';
    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'space-between',
            width: "100%",
            backgroundColor: bgColor,
        },
        backButtonContainer: {
            width: '10%',
            borderWidth: 1
        }
    })
    return (
        <View style={styles.container}>
            <NavIconButtonWithOptionalText iconName="doubleleft" replaceScreen={replaceScreen} destination={destination} />
            <View>
                <Header transparentBg={transparentBg} header={header} />
            </View>
            <Icon name='doubleleft' color='transparent' />
        </View>
    )
}

