import { View, Text, TextInput, StyleSheet } from 'react-native';

type inputBoxWithOptionalTitle = {
    title?: string;
    placeholder: string;
    updaterFn: (a: string) => void;
}

export default function InputBoxWithOptionalTitle({placeholder, updaterFn, title}:inputBoxWithOptionalTitle) {
    

    return (
        <View style={styles.textInputContainer}>
            {title && <Text>{title}</Text> }
            <TextInput style={styles.textInput} onChangeText={(s: string) => updaterFn(s)} placeholder={placeholder} />
        </View>
    )
}

const styles = StyleSheet.create({
    textInput: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'rgb(227,227,227)',
        paddingLeft: 5,
    }, 
    textInputContainer: {
        paddingTop: 5,
        paddingBottom: 5,
    },
})