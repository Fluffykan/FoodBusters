import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Button = {
    text: string;
    textColor?: string;
    bgColor?: string;
    underline?: boolean;
    border: 'rounded' | 'square';
    fn: () => void;

}

export default function Button({text, textColor, bgColor, border, underline, fn}:Button) {
    const borderRadius = border == 'rounded' ? 10 : 0;
    const decoration = underline ? 'underline' : 'none';
    const color = textColor ? textColor : 'white';
    const backgroundColor = bgColor ? bgColor : 'blue';

    return (
        <TouchableOpacity onPress={() => fn()} style={{paddingTop: 5, paddingBottom: 5}}>
            <Text style={{backgroundColor: backgroundColor, borderWidth: 1, borderRadius: borderRadius, textAlign: 'center', color: color, textDecorationLine: decoration, paddingLeft: 10, paddingRight: 10}}>{text}</Text>
        </TouchableOpacity>
    )
}

