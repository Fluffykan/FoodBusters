import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

type IconButtonProps = {
    iconName: string;
    fn: () => void;
    flexDir?: "row" | "column";
    iconSize?: number; // default size = 50
    iconColor?: string; // default color = black
    text?: string; // default = no text
    fontSize?: number; // default font size = 18
    border?: boolean;

}


export default function LinkIconButtonWithOptionalText({iconName, fn, iconSize, flexDir, iconColor, text, fontSize, border}: IconButtonProps) {  
    const defaultTextSize = text ? (fontSize ? fontSize : 15) : 0;
    const defaultIconColor = iconColor ? iconColor : 'black';
    const defaultIconSize = iconSize ? iconSize : 30;
    const flexDirection = flexDir ? flexDir : "column";
    const borderWidth = border ? 1 : 0;

    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: 5,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            borderWidth: borderWidth,
            flexDirection: flexDirection,
            padding: 3,
        },
        text: {
            fontSize: defaultTextSize,
            textAlign: 'center',
            paddingRight: 10
        }
    })
    
    if (flexDirection == "row") {
        return (
            <TouchableOpacity onPress={fn}>
                <View style={styles.container}>
                    {text && <Text style={styles.text}>{text}</Text>}
                    <Icon name={iconName} size={defaultIconSize} color={defaultIconColor} />
                </View>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity onPress={fn}>
                <View style={styles.container}>
                    <Icon name={iconName} size={defaultIconSize} color={defaultIconColor} />
                    {text && <Text style={styles.text}>{text}</Text>}
                </View>
            </TouchableOpacity>
        )
    
    }
}

