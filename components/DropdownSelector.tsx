import { useState } from "react";
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import LinkIconButtonWithOptionalText from "./LinkIconButtonWithOptionalText";

type DropDownSelectorProps = {
    items:string[];
    title:string;
    selectedValueStore:string;
    updatePress: (x:string) => void;
    fontSize?:number;
}
export default function DropDownSelector({items, fontSize, title, selectedValueStore, updatePress}:DropDownSelectorProps) {
    const [open, setOpen] = useState(false);
    const textSize = fontSize ? fontSize : 25;
    const [original, updateOriginal] = useState(selectedValueStore);

    const styles = StyleSheet.create({
        touchbar: {
            borderWidth: 1,
            borderRadius: 10,
            padding: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent:'center'
        },
        text: {
            fontSize: textSize - 5,
        },
        title: {
            fontSize: textSize,
            paddingLeft: 10,
            textDecorationLine: "underline",
        },
        optionsContainer: {
            paddingVertical: 2.5,
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '15%',
        },
        scrollView: {
            height: '30%',
            borderLeftWidth: 1,
            borderRightWidth: 1, 
            borderBottomWidth: 1,
            borderBottomLeftRadius: 10, 
            borderBottomRightRadius: 10,
        },
        scrollViewPadding: {
            padding: 5,
        }
    })

    return (
        <View>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity onPress={() => setOpen(!open)} style={styles.touchbar}>
                <Text style={styles.text}>{selectedValueStore}</Text>
                <View style={styles.buttonContainer}>
                    <LinkIconButtonWithOptionalText iconName="close" iconSize={fontSize} fn={() => {updatePress(original)}} />
                    <Icon name='downcircleo' size={fontSize} />
                </View>

            </TouchableOpacity>
            {open &&
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewPadding}>
                {items.map((x) => 
                <TouchableOpacity style={styles.optionsContainer} onPress={() => {updatePress(x); setOpen(false)}}>
                    <Text style={styles.text}>{x}</Text>
                </TouchableOpacity>)}
            </ScrollView>
            }
        </View>
    )
    
}

