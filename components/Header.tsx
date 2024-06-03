import { View, Text, StyleSheet } from 'react-native';


type Header = {
    header: string;
}

export default function Header({header}:Header) {
    return (
        <Text style={styles.headerText}>{header}</Text>
    )
}

const styles = StyleSheet.create({
    headerText: {
        textAlign: 'center',
        justifyContent: 'center',
        fontWeight: '900',
        fontSize: 35,
        backgroundColor: 'white',
    }
})