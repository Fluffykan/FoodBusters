import {View, Text, Modal, StyleSheet} from 'react-native'
import LinkIconButtonWithOptionalText from './LinkIconButtonWithOptionalText';

type PopupProps = {
    visible:boolean;
    setVisible: (b:boolean) => void;
    bodyText:string;
    paddingVertical?:number;
    paddingHorizontal?:number;
    height?:number;
    width?:number;
    bgColor?:string;
    fontSize?:number;
    fontColor?:string;
    borderWidth?:number;
    borderRadius?:number;
    borderColor?:string;
    buttonColor?:string;
}

export function CollapsablePopupWindowStyle(
    {
        visible, setVisible, bodyText, paddingVertical, paddingHorizontal, bgColor,
        fontSize, borderWidth, borderColor, borderRadius, height, width, fontColor,
        buttonColor
    }:PopupProps) {
    
    const paddingV = paddingVertical ? paddingVertical : 0;
    const paddingH = paddingHorizontal ? paddingHorizontal : 0;
    const backgroundColor = bgColor ? bgColor : "white";
    const windowHeight = (height && height > 0 && height < 100) ? `${height}%`: '50%';
    const windowWidth = (width && width > 0 && width < 100) ? `${width}%` : '70%';

    const styles = StyleSheet.create({
        popup: {
            // ignore red lines, faulty inputs handled by checks in windowHeight and windowWidth
            height: windowHeight,
            width: windowWidth,
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
            color: fontColor,
        },
        windowHeader: {
            justifyContent:'flex-end',
            flexDirection:'row',
            width: '100%',
        },
    })
    
    return (
        <Modal
            visible={visible}
            animationType='slide'
            transparent={true}
        >
            <View style={styles.center}>
                <View style={styles.popup}>
                    <View style={styles.windowHeader}>
                        <View/>
                        <LinkIconButtonWithOptionalText
                            iconName='close'
                            iconColor={buttonColor}
                            fn={() => setVisible(false)}
                        />
                    </View>
                    <Text style={styles.text}>{bodyText}</Text>
                    <View/>
                </View>
            </View>
        </Modal>
    )
}

