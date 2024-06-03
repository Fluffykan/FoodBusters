import { View, Text, StyleSheet } from 'react-native';


type Header = {
    header: string;
    transparentBg?: boolean
}

export default function Header({header, transparentBg}:Header) {
    const bgColor = transparentBg ? 'none': 'white';
    const styles = StyleSheet.create({
        headerText: {
            textAlign: 'center',
            justifyContent: 'center',
            fontWeight: '900',
            fontSize: 35,
            backgroundColor: bgColor,
        }
    })
    return (
        <Text style={styles.headerText}>{header}</Text>
    )
}

