import {View, Text, Modal, StyleSheet} from 'react-native'
import NavIconButtonWithOptionalText from '@/components/NavIconButtonWithOptionalText';

type PopupProps = {
    visible:boolean;
    redirectTo:string;
    bodyText:string;
    buttonText:string;
    iconName:string;
    paddingVertical?:number;
    paddingHorizontal?:number;
    bgColor?:string;
    fontSize?:number;
    borderWidth?:number;
    borderRadius?:number;
    borderColor?:string;
    buttonColor?:string;
}

export default function RedirectingPopup(
    {
        visible, redirectTo, buttonText, bodyText, 
        iconName, paddingVertical, paddingHorizontal, bgColor,
        fontSize, borderWidth, borderColor, borderRadius,
        buttonColor
    }:PopupProps) {
    
    const paddingV = paddingVertical ? paddingVertical : 0;
    const paddingH = paddingHorizontal ? paddingHorizontal : 0;
    const backgroundColor = bgColor ? bgColor : "white";

    const styles = StyleSheet.create({
        popup: {
            height: '50%',
            width:'70%',
            backgroundColor: backgroundColor,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: paddingV,
            paddingHorizontal: paddingH,
            borderWidth: borderWidth,
            borderRadius: borderRadius,
            borderColor: borderColor,
        },
        center: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        text: {
            fontSize: fontSize,
            textAlign:'center',
        }
    })
    
    return (
        <Modal
            visible={visible}
            animationType='slide'
            transparent={true}
        >
            <View style={styles.center}>
                <View style={styles.popup}>
                    <Text style={styles.text}>{bodyText}</Text>
                    <NavIconButtonWithOptionalText 
                        text={buttonText} 
                        destination={redirectTo} 
                        replaceScreen={true} 
                        iconName={iconName} 
                        border={true}
                        borderStyle='rounded'
                        bgColor={buttonColor}
                    />
                </View>
            </View>
        </Modal>
    )
}

