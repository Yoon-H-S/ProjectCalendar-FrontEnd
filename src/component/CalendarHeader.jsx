import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { colors, height } from '../style/globalStyle';

export default function CalendarHeader({showYear, setToday, setIsAdd}) {
    return(
        <View style={style.header}>
            <View style={style.headerContent}>
                <TouchableOpacity>
                    <Image
                        style={style.button}
                        source={require('../../assets/menu.png')}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                <View style={style.year}>
                    <Text style={style.yearText}>{showYear}년</Text>
                </View>
            </View>
            <View style={style.headerContent}>
                <TouchableOpacity onPress={setToday}>
                    <Image
                        style={style.button}
                        source={require('../../assets/today.png')}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image
                        style={style.button}
                        source={require('../../assets/search.png')}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsAdd(true)}>
                    <Image
                        style={style.button}
                        source={require('../../assets/add.png')}
                        resizeMode='contain'
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    header: {
        height: 60 * height,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerContent: {
        flexDirection: 'row',
    },
    button: {
        width: 32,
        height: 32,
        marginHorizontal: 5
    },
    year: {
        marginLeft: 5,
        height: 32,
        justifyContent: 'center'
    },
    yearText: {
        fontSize: 18,
        color: colors.text
    }
});