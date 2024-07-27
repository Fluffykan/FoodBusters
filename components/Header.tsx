import { View, Text, StyleSheet } from 'react-native';


type Header = {
    header: string;
    transparentBg?: boolean
    size?: "small" | "med" | "large";

}

export default function Header({header, transparentBg, size}:Header) {
    const bgColor = transparentBg ? 'none': 'white';
    const fontSize = size == 'small' ? 20 : size == 'med' ? 27 : 35;
    const styles = StyleSheet.create({
        headerText: {
            textAlign: 'center',
            justifyContent: 'center',
            fontWeight: '900',
            fontSize: fontSize,
            backgroundColor: bgColor,
            width: '100%',
        }
    })
    return (
        <Text style={styles.headerText}>{header}</Text>
    )
}

