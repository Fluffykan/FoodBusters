import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type HyperlinkButton = {
    text: string;
    fn: () => void;
};

export default function HyperlinkButton({text, fn}:HyperlinkButton) {
    return (
        <TouchableOpacity onPress={() => fn()}>
            <Text style={styles.redirectButtonText}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    redirectButtonText: {
        textDecorationLine: 'underline',
        color: 'blue',
        textAlign: 'center',
        paddingBottom: 10,
        paddingTop: 10,
    },
})