import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Button = {
    text: string;
    fontSize?: number;
    textColor?: string;
    bgColor?: string;
    underline?: boolean;
    border?: 'rounded' | 'square' | 'none';
    fn: () => void;

}

export default function Button({text, textColor, fontSize, bgColor, border, underline, fn}:Button) {
    const borderRadius = border == 'rounded' ? 10 : 0;
    const borderWidth = border == 'none' ? 0 : 1;
    const decoration = underline ? 'underline' : 'none';
    const color = textColor ? textColor : 'white';
    const backgroundColor = bgColor ? bgColor : 'blue';
    const size = fontSize ? fontSize : 15;
    const styles = StyleSheet.create({
        text: {
            backgroundColor: backgroundColor,
            borderWidth: borderWidth, 
            borderRadius: borderRadius,
            textAlign: 'center',
            color: color,
            textDecorationLine: decoration,
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

