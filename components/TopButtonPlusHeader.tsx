import { View, Text, StyleSheet } from 'react-native';
import IconButtonWithOptionalText from "./NavIconButtonWithOptionalText";
import Header from './Header';

type TopButtonPlusHeaderProps = {
    header:string;
}

export default function TopButtonPlusHeader({header}:TopButtonPlusHeaderProps) {
    return (
        <View style={styles.container}>
            <IconButtonWithOptionalText iconName="doubleleft" replaceScreen={false} destination='/pages/workInProgress' />
            <Header header={header} />
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        alignItems: 'center',
        textAlign: 'center',
        justifyContent: 'center',
        width: "100%",
        backgroundColor: 'white',
    }
})