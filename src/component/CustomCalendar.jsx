import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, KeyboardAvoidingView, TextInput, TouchableWithoutFeedback, Keyboard, View, Platform } from 'react-native';
import { LocaleConfig } from 'react-native-calendars';
import axios from 'axios';

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
    const [showYear, setShowYear] = useState(today.slice(0, 4));
    const [restDate, setRestDate] = useState([]);

    useEffect(() => {
        axios.get('http://192.168.45.95:8080/api/rest-day', {
            params: {
                year: showYear
            }
        }).then((response) => {
            var restDay = {};
            response.data?.map((value) => {
                var date = value.date
                restDay = {
                    ...restDay,
                    [date]: {marked: true, rest: true, periods: [{color: colors.sunday, startingDay: value.name, endingDay: true}]}
                };
            });
            setRestDate(restDay);
        }).catch((error) => {
            console.log(error);
        });
    }, [showYear]);

    const setToday = () => {
        setSelectDate(today);
        dismiss();
    };

    const changeSelectDate = useCallback((date) => {
        setSelectDate(date);
        dismiss();
    });

    const changeMonth = useCallback((date) => {
        if(date.slice(0, 7) !== selectDate.slice(0, 7)) {
            if(date.slice(0, 7) === today.slice(0, 7)) {
                setSelectDate(today);
            } else {
                setSelectDate(date.slice(0, 8) + '01');
            }
        }
        setShowYear(date.slice(0, 4));
        dismiss();
    });

    const dismiss = () => {
        Keyboard.dismiss();
    };

    return (
        <>
            <TouchableWithoutFeedback onPress={dismiss}>
                <View>
                    <CalendarHeader
                        showYear={showYear}
                        setToday={setToday}
                    />
                    <MonthCalendar
                        selectDate={selectDate}
                        setSelectDate={changeSelectDate}
                        changeMonth={changeMonth}
                        restDate={restDate}
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
                    placeholderTextColor={colors.line}
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