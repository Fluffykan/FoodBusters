import { View, StyleSheet } from 'react-native';

type LineProps = {
    style: 'solid' | 'dotted';
    color?: string;
}

export default function PageBreakLine({style, color}:LineProps) {
    const lineColor = color ? color : 'black';

    const styles = StyleSheet.create({
        solidLine: {
            width: '100%',
            height: 0,
            backgroundColor: lineColor,
            borderWidth: 1,
            marginVertical: 10,
        },
        dottedLine: {
            width: '100%', 
            height: 0,
            borderStyle: 'dotted',
            borderWidth: 1,
            borderColor: lineColor,
        }
    })

    if (style == 'solid') {
        return (
            <View style={styles.solidLine} />
        )
    } else {
        return (
            <View style={styles.dottedLine} />
    
        )
    }
}
