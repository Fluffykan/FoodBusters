import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Button = {
    text: string;
    fontSize?: number;
    textColor?: string;
    bgColor?: string;
    underline?: boolean;
    border: 'rounded' | 'square';
    fn: () => void;

}

export default function Button({text, textColor, fontSize, bgColor, border, underline, fn}:Button) {
    const borderRadius = border == 'rounded' ? 10 : 0;
    const decoration = underline ? 'underline' : 'none';
    const color = textColor ? textColor : 'white';
    const backgroundColor = bgColor ? bgColor : 'blue';
    const size = fontSize ? fontSize : 15;
    const styles = StyleSheet.create({
        text: {
            backgroundColor: backgroundColor,
            borderWidth: 1, 
            borderRadius: borderRadius,
            textAlign: 'center',
            color: color,
            textDecorationColor: decoration,
            paddingHorizontal: 10, 
            fontSize: size,
        }
    })

    return (
        <TouchableOpacity onPress={() => fn()} style={{paddingTop: 5, paddingBottom: 5}}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

