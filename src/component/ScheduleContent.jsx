import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

import { colors, height } from '../style/globalStyle';

export default function ScheduleContent({imgSrc, text, clickEvent}) {
    return (
        <Pressable onPress={clickEvent}>
            <View style={style.container}>
                <Image
                    style={style.icon}
                    source={imgSrc}
                    resizeMode='contain'
                />
                <Text style={style.text}>{text}</Text>
            </View>
        </Pressable>
    );
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: colors.line,
        paddingVertical: 15 * height
    },
    icon: {
        height: 24,
        width: 24,
        marginRight: 10,
        marginLeft: 5
    },
    text: {
        fontSize: 14,
        color: colors.text
    }
});