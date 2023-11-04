import React, { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, TextInput, TouchableWithoutFeedback, Keyboard, View, Platform } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';

import { colors, height } from '../style/globalStyle';
import MonthCalendar from './MonthCalendar';
import CalendarHeader from './CalendarHeader';

LocaleConfig.locales['ko'] = {
    monthNames: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    today: "오늘"
}

LocaleConfig.defaultLocale = 'ko';

export default function CustomCalendar() {
    const today = new Date(new Date().getTime() + (1000 * 60 * 60 * 9)).toISOString().slice(0, 10);
    const [selectDate, setSelectDate] = useState(today);
    const [showDate, setShowDate] = useState(today);

    const setToday = () => {
        setSelectDate(today);
        setShowDate(today);
        dismiss();
    }

    const changeSelectDate = (date) => {
        setSelectDate(date);
        dismiss();
    }

    const changeShowDate = (date) => {
        setShowDate(date);
        dismiss();
    }

    const dismiss = () => {
        Keyboard.dismiss();
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={dismiss}>
                <View>
                    <CalendarHeader
                        showDate={showDate}
                        setToday={setToday}
                    />
                    <MonthCalendar
                        selectDate={selectDate}
                        setSelectDate={changeSelectDate}
                        showDate={showDate}
                        setShowDate={changeShowDate}
                    />
                </View>
            </TouchableWithoutFeedback>
            <KeyboardAvoidingView
                behavior='position'
                style={style.container}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 30 * height : 20 * height}
            >
                <TextInput
                    placeholder='빠른일정추가'
                    style={style.quickAdd}
                />
            </KeyboardAvoidingView>
        </>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1
    },
    quickAdd: {
        marginTop: 10 * height,
        marginBottom: 20 * height,
        marginHorizontal: 16,
        paddingHorizontal: 20,
        height: 40 * height,
        backgroundColor: colors.background,
        borderColor: colors.line,
        borderWidth: 0.5,
        borderRadius: 20 * height
    }
});