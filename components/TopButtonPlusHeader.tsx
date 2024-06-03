import { View, Text, StyleSheet } from 'react-native';
import IconButtonWithOptionalText from "./NavIconButtonWithOptionalText";
import Header from './Header';

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
            <IconButtonWithOptionalText iconName="doubleleft" replaceScreen={replaceScreen} destination={destination} />
            <Header header={header} transparentBg={transparentBg} />
            <View />
        </View>
    )
}

