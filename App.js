import React, { useState, useEffect } from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomCalendar from './src/component/CustomCalendar';
import { statusBarHeight } from './src/style/globalStyle';
import KakaoLogin from './src/component/KakaoLogin';

export default function App() {
    const [number, setNumber] = useState(null);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
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
                <CustomCalendar />
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
