import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, TouchableWithoutFeedback, Keyboard, View, Modal } from 'react-native';
import axios from 'axios';

import { colors, height } from '../style/globalStyle';
import MonthCalendar from './MonthCalendar';
import CalendarHeader from './CalendarHeader';
import server from '../../address';
import lunarData from '../../lunar';
import AddSchedule from './AddSchedule';

export default function CustomCalendar({userNum}) {
    const [isAdd, setIsAdd] = useState(false);
    const today = new Date(new Date().getTime() + (1000 * 60 * 60 * 9)).toISOString().slice(0, 10);
    const [selectDate, setSelectDate] = useState(today);
    const [lunar, setLunar] = useState({
        date: '',
        leap: ''
    });
    const [showYear, setShowYear] = useState(today.slice(0, 4));
    const [restDate, setRestDate] = useState({});
    const [schedule, setSchedule] = useState({});

    useEffect(() => {
        axios.get(server + '/api/schedule-list', {
            params: {
                userNum: userNum
            }
        }).then((response) => {
            setSchedule(response.data.marker);
        }).catch((error) => {
            console.log(error);
        })

    },[isAdd]);

    useEffect(() => {
        if(!(showYear +  "-01-01" in restDate)) {
            axios.get(server + '/api/rest-day', {
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
        const lunarInfo = lunarData.find(item => item.solar === selectDate);
        setLunar({
            date: Number(lunarInfo.lunar.slice(5, 7)) + "/" + Number(lunarInfo.lunar.slice(8, 10)),
            leap: lunarInfo.lunar_type
        });
    }, [selectDate]);

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
            <Modal
                animationType="slide"
                transparent= {true}
                visible={isAdd}
                onRequestClose={() => setIsAdd(!isAdd)}
            >
                <AddSchedule setIsAdd={setIsAdd} userNum={userNum} />
            </Modal>
            <TouchableWithoutFeedback onPress={dismiss}>
                <View>
                    <CalendarHeader
                        showYear={showYear}
                        setToday={setToday}
                        setIsAdd={setIsAdd}
                    />
                    <MonthCalendar
                        schedule={schedule}
                        selectDate={selectDate}
                        setSelectDate={changeSelectDate}
                        lunar={lunar}
                        changeMonth={changeMonth}
                        restDate={restDate}
                    />
                </View>
            </TouchableWithoutFeedback>
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