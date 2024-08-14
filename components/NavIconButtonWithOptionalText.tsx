import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import Icon from 'react-native-vector-icons/AntDesign';

type IconButtonProps = {
    iconName: string;
    destination: string; // redirect destination using <Link /> from expo-router
    replaceScreen: boolean;
    flexDir?: "row" | "column";
    iconSize?: number; // default size = 50
    iconColor?: string; // default color = black
    text?: string; // default = no text
    fontSize?: number; // default font size = 18
    border?: boolean;
    borderStyle?: 'rounded' | 'square';
    bgColor?:string;

}


export default function NavIconButtonWithOptionalText(
    {
        iconName, destination, borderStyle, replaceScreen, 
        flexDir, iconSize, iconColor, text, 
        fontSize, border, bgColor

    }:IconButtonProps) {  
    const defaultTextSize = text ? (fontSize ? fontSize : 15) : 0;
    const defaultIconColor = iconColor ? iconColor : 'black';
    const defaultIconSize = iconSize ? iconSize : 30;
    const flexDirection = flexDir ? flexDir : "column";
    const borderWidth = border ? 1 : 0;
    const borderRadius = borderStyle ? borderStyle == 'rounded' ? 10 : 0 : 10;
    const textPaddingRight = flexDirection == "row" ? 10 : 0;

    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: 10,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: flexDirection,
            borderRadius: borderRadius, 
            borderWidth: borderWidth,
            backgroundColor: bgColor,
        },
        text: {
            fontSize: defaultTextSize,
            textAlign: 'center',
            paddingRight: textPaddingRight,
        }
    })
    
    // if else statements to ensure that for flex-direction = column, icon is always above text
    if (replaceScreen) {
        if (flexDirection == "row") {
            return (
                <Link replace={replaceScreen} href={destination}>
                    <View style={styles.container}>
                        {text && <Text style={styles.text}>{text}</Text>}
                        <Icon name={iconName} size={defaultIconSize} color={defaultIconColor} />
                    </View>
                </Link>
            )
        } else {
        return (
            <Link replace={replaceScreen} href={destination}>
                <View style={styles.container}>
                    <Icon name={iconName} size={defaultIconSize} color={defaultIconColor} />
                    {text && <Text style={styles.text}>{text}</Text>}
                </View>
            </Link>
        )
        }
    } else {
        if (flexDirection == "row") {
            return (
                <Link href={destination}>
                    <View style={styles.container}>
                        {text && <Text style={styles.text}>{text}</Text>}
                        <Icon name={iconName} size={defaultIconSize} color={defaultIconColor} />
                    </View>
                </Link>
            )
        } else {
            return (
                <Link href={destination}>
                    <View style={styles.container}>
                        <Icon name={iconName} size={defaultIconSize} color={defaultIconColor} />
                        {text && <Text style={styles.text}>{text}</Text>}
                    </View>
                </Link>
            )
        }

    }
}

