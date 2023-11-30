import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Switch, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { colors, height } from '../style/globalStyle';

export default function ScheduleDateTime() {
    const today = new Date();
    const [start, setStart] = useState(new Date(new Date().setHours(today.getHours() + 1, 0, 0)));
    const [end, setEnd] = useState(new Date(new Date().setHours(today.getHours() + 2, 0, 0)));
    const weekName = ['일', '월', '화', '수', '목', '금', '토'];
    const [show, setShow] = useState({
        type: null,
        type2: null,
        value: '',
    });
    const [isAllTime, setIsAllTime] = useState(false);

    const changeShow = (t, t2) => {
        if(show.type === t && show.type2 === t2) {
            setShow({
                ...show,
                type: null
            });
            return;
        }

        if(t2 === 'start') {
            var v = start;
        } else {
            var v = end;
        }

        setShow({
            ...show,
            type: t,
            type2: t2,
            value: v
        });
    }

    const changeTime = ({type}, selectedDate) => {
        if(Platform.OS === 'android') {
            setShow({
                ...show,
                type: null
            });
        }

        if (type === 'set') {
            if(show.type2 === 'start') {
                setStart(selectedDate);
                if(selectedDate > end) {
                    setEnd(selectedDate);
                }
            } else {
                setEnd(selectedDate);
                if(selectedDate < start) {
                    setStart(selectedDate);
                }
            }
        }
    }

    const changeAllTime = () => {
        setStart(new Date(start.setHours(0, 0, 0)));

        if(!isAllTime) {
            setEnd(new Date(end.setHours(23, 59, 0)));
        } else {
            setEnd(new Date(end.setHours(1, 0, 0)));
        }

        setShow({
            ...show,
            type: null
        });

        setIsAllTime(!isAllTime);
    }

    return(
        <View style={style.container}>
            <View style={style.allTime}>
                <View style={style.title}>
                    <Image
                        style={style.icon}
                        source={require('../../assets/time.png')}
                        resizeMode='contain'
                    />
                    <Text style={style.text}>하루 종일</Text>
                </View>
                <Switch
                    style={style.switch}
                    onValueChange={() => changeAllTime()}
                    value={isAllTime}
                />
            </View>
            <View style={style.content}>
                <View style={style.dateTime}>
                    <Text onPress={() => changeShow('date', 'start')}>
                        {today.getFullYear() !== start.getFullYear() && `${start.getFullYear()}.`}
                        {` ${start.getMonth() + 1}. ${start.getDate()}. (${weekName[start.getDay()]})`} 
                    </Text>
                    {
                        !isAllTime &&
                        <Text style={{marginTop: 10}} onPress={() => changeShow('time', 'start')}>
                            {start.getHours() >= 12 ? 
                                `오후 ${start.getHours() - 12 === 0 ? '12' : ('0' + (start.getHours() - 12)).slice(-2)}`
                            :
                                `오전 ${start.getHours() === 0 ? '12' : ('0' + start.getHours()).slice(-2)}`
                            }
                            {`:${('0' + start.getMinutes()).slice(-2)}`}
                        </Text>
                    }
                </View>
                <Image
                    style={style.arrow}
                    source={require('../../assets/arrow.png')}
                    resizeMode='contain'
                />
                <View style={style.dateTime}>
                    <Text onPress={() => changeShow('date', 'end')}>
                        {today.getFullYear() !== end.getFullYear() && `${end.getFullYear()}.`}
                        {` ${end.getMonth() + 1}. ${end.getDate()}. (${weekName[end.getDay()]})`}
                    </Text>
                    {
                        !isAllTime && 
                        <Text style={{marginTop: 10}} onPress={() => changeShow('time', 'end')}>
                            {end.getHours() >= 12 ? 
                                `오후 ${start.getHours() - 12 === 0 ? '12' : ('0' + (end.getHours() - 12)).slice(-2)}`
                            :
                                `오전 ${end.getHours() === 0 ? '12' : ('0' + end.getHours()).slice(-2)}`
                            }
                            {`:${('0' + end.getMinutes()).slice(-2)}`}
                        </Text>
                    }
                </View>
            </View>
            {
                show.type !== null && 
                <View style={Platform.OS === 'ios' && style.picker}>
                    <DateTimePicker
                        mode={show.type}
                        display={show.type === 'date' ? 'inline' : 'spinner'}
                        value={show.value}
                        onChange={changeTime}
                        locale='ko'
                    />
                </View>
            }
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        borderBottomWidth: 0.5,
        borderBottomColor: colors.line,
        paddingVertical: 15 * height
    },
    allTime: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 5
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        height: 24,
        width: 24,
        marginRight: 10
    },
    text: {
        fontSize: 14,
        color: colors.text
    },
    switch: {
        height: 24,
        transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }]
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 25,
        height: 50 * height
    },
    dateTime: {
        alignItems: 'center',
        width: 130
    },
    arrow: {
        height: 32,
        width: 32
    },
    picker: {
        marginTop: 10 * height,
        paddingTop: 10 * height,
        borderTopWidth: 0.5,
        borderTopColor: colors.line
    }
});