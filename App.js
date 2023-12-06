import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocaleConfig } from 'react-native-calendars';

import CustomCalendar from './src/component/CustomCalendar';
import { statusBarHeight } from './src/style/globalStyle';
import KakaoLogin from './src/component/KakaoLogin';

LocaleConfig.locales['ko'] = {
    monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: "오늘"
}

LocaleConfig.defaultLocale = 'ko';

export default function App() {
    const [number, setNumber] = useState(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if(Platform.OS === 'web') {
            setNumber(0);
            setIsReady(true);
            return;
        }
        async function getData() {
            try {
                const num = await AsyncStorage.getItem('userNumber');
                setNumber(num);
                setIsReady(true);
            } catch(e) {
                console.log(e);
            }
        }
        getData();
    });

    return (
        isReady &&
        <View style={styles.container}>
            {number !== null ?
                <CustomCalendar userNum={number} />
            :
                <KakaoLogin setNumber={setNumber} />
            }
            <StatusBar />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: statusBarHeight,
        flex: 1
    },
});
