import { View, Text, StyleSheet } from 'react-native';
import NavIconButtonWithOptionalText from './NavIconButtonWithOptionalText';
import Icon from 'react-native-vector-icons/AntDesign';

type Header = {
    header: string;
    transparentBg?: boolean;
    size?: "small" | "med" | "large";
    inbox?: boolean;

}

export default function Header({header, transparentBg, size, inbox}:Header) {
    const bgColor = transparentBg ? 'none': 'white';
    const fontSize = size == 'small' ? 20 : size == 'med' ? 27 : 35;
    const styles = StyleSheet.create({
        headerText: {
            textAlign: 'center',
            justifyContent: 'center',
            fontWeight: '900',
            fontSize: fontSize,
        }, 
        containerWithInbox: {
            flexDirection: 'row',
            backgroundColor: bgColor,
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        defaultContainer: {
            justifyContent: 'center',
            backgroundColor: 'white',
        }
    })
    if (inbox) {
        return (
            <View style={styles.containerWithInbox}>
                <Icon name='mail' color="transparent" size={30} />
                <Text style={styles.headerText}>{header}</Text>
                <NavIconButtonWithOptionalText iconName='mail' iconColor='black' destination='pages/checkRecommendedFood' replaceScreen={true} />
            </View>
        )
    }
    return (
        <View style={styles.defaultContainer}>
            <Text style={styles.headerText}>{header}</Text>
        </View>
    )
}

