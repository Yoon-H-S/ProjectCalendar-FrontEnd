import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, KeyboardAvoidingView, TextInput, TouchableWithoutFeedback, Keyboard, View, Platform } from 'react-native';
import axios from 'axios';

import { colors, height } from '../style/globalStyle';
import MonthCalendar from './MonthCalendar';
import CalendarHeader from './CalendarHeader';

export default function CustomCalendar({setIsAdd}) {
    const today = new Date(new Date().getTime() + (1000 * 60 * 60 * 9)).toISOString().slice(0, 10);
    const [selectDate, setSelectDate] = useState(today);
    const [lunar, setLunar] = useState({
        year: '',
        date: '',
        leap: ''
    });
    const [showYear, setShowYear] = useState(today.slice(0, 4));
    const [restDate, setRestDate] = useState({});

    useEffect(() => {
        if(!(showYear +  "-01-01" in restDate)) {
            axios.get('http://192.168.233.235:8080/api/rest-day', {
                params: {
                    year: showYear
                }
            }).then((response) => {
                var rd = restDate;
                response.data?.map((value) => {
                    var date = value.date
                    rd = {
                        ...rd,
                        [date]: {marked: true, rest: true, periods: [{color: colors.sunday, startingDay: value.name, endingDay: true}]}
                    };
                });
                setRestDate(rd);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [showYear]);

    useEffect(() => {
        axios.get('http://192.168.233.235:8080/api/lunar-date', {
            params: {
                year: selectDate.slice(0, 4),
                month: selectDate.slice(5, 7),
                day: selectDate.slice(8, 10)
            }
        }).then(response => {
            setLunar({
                year: response.data.lunYear,
                date: Number(response.data.lunMonth) + "/" + Number(response.data.lunDay),
                leap: response.data.leap
            });
        }).catch((error) => {
            console.log(error);
        });
    }, [selectDate]);

    const setToday = () => {
        setSelectDate(today);
        dismiss();
    };

    const changeSelectDate = useCallback((date) => {
        setSelectDate(date);
        setLunar({});
        dismiss();
    });

    const changeMonth = useCallback((date) => {
        if(date.slice(0, 7) !== selectDate.slice(0, 7)) {
            if(date.slice(0, 7) === today.slice(0, 7)) {
                setSelectDate(today);
            } else {
                setSelectDate(date.slice(0, 8) + '01');
            }
            setLunar({});
        }
        if(showYear !== date.slice(0, 4)) {
            setShowYear(date.slice(0, 4));
        }
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
                        setIsAdd={setIsAdd}
                    />
                    <MonthCalendar
                        selectDate={selectDate}
                        setSelectDate={changeSelectDate}
                        lunar={lunar}
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