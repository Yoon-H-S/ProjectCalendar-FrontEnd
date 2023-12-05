import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Image, Keyboard, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from 'react-native';
import axios from 'axios';

import { colors, height, fullHeight, fullWidth } from '../style/globalStyle';
import ScheduleContent from './ScheduleContent';
import ScheduleDateTime from './ScheduleDateTime';
import server from '../../address';

export default function AddSchedule({setIsAdd, userNum}) {
    const today = new Date();
    const [start, setStart] = useState(new Date(new Date().setHours(today.getHours() + 1, 0, 0)));
    const [end, setEnd] = useState(new Date(new Date().setHours(today.getHours() + 2, 0, 0)));
    const textInputRef = useRef(null);
    const [title, setTitle] = useState('');
    const [memo, setMemo] = useState('');
    // const [file, setFile] = useState(null);
    const [contentValue, setContentValue] = useState({
        lunar: null,
        alarm: null,
        repeatType: null,
        repeatWeek: null,
        repeatEnd: null,
        // location: null
    });
    const [contentName, setContentName] = useState({
        alarmName: '알림 없음',
        repeatName: '반복 안 함',
        // locationName: '장소 추가',
        // fileName: '파일 첨부'
    });

    const {alarmName, repeatName} = contentName;
    
    const changeContentName = (id, value) => {
        setContentName({
            ...contentName,
            [id]: value
        });
    }

    const handleViewPress = () => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    };

    const dismiss = () => {
        Keyboard.dismiss();
    };

    const scheduleInsert = () => {
        if(title === '') {
            Alert.alert("일정 제목을 입력하세요.");
            return;
        }
        axios.post(server + '/api/add-schedule', {
                userNum: userNum,
                title: title,
                start: new Date(start.getTime() + (1000 * 60 * 60 * 9)),
                end: new Date(end.getTime() + (1000 * 60 * 60 * 9)),
                // lunar: contentValue.lunar,
                memo: memo,
                // notify: contentValue.alarm,
                // repType: contentValue.repeatType,
                // repWeek: contentValue.repeatWeek,
                // repEnd: contentValue.repeatEnd
        }).then((response) => {
            console.log(response.data);
            setIsAdd(false);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <TouchableWithoutFeedback onPress={dismiss}>
            <View style={style.container}>
                <KeyboardAvoidingView
                    behavior='height'
                    style={{flex: 1}}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 50 * height : 20 * height}
                >
                    <View style={style.header}>
                        <Text
                            style={style.text}
                            onPress={() => setIsAdd(false)}
                        >
                            취소
                        </Text>
                        <Text style={style.title}>새로운 일정</Text>
                        <Text
                            style={style.text}
                            onPress={() => scheduleInsert()}
                        >
                            추가
                        </Text>
                    </View>
                    <ScrollView>
                        <TextInput
                            placeholder='제목'
                            placeholderTextColor={colors.line}
                            style={style.titleInput}
                            onChangeText={text => setTitle(text)}
                            value={title}
                        />
                        <ScheduleDateTime
                            today={today}
                            start={start}
                            setStart={setStart}
                            end={end}
                            setEnd={setEnd}
                        />
                        <ScheduleContent
                            imgSrc={require('../../assets/alarm.png')}
                            text={alarmName}
                            change={changeContentName}
                            clickEvent={() => console.log("알림 클릭함")}
                        />
                        <ScheduleContent
                            imgSrc={require('../../assets/repeat.png')}
                            text={repeatName}
                            change={changeContentName}
                            clickEvent={() => console.log("반복 클릭함")}
                        />
                        {/* <ScheduleContent
                            imgSrc={require('../../assets/location.png')}
                            text={locationName}
                            change={changeContentName}
                            clickEvent={() => console.log("장소 클릭함")}
                        /> */}
                        {/* <ScheduleContent
                            imgSrc={require('../../assets/file.png')}
                            text={fileName}
                            change={changeContentName}
                            clickEvent={() => console.log("파일 클릭함")}
                        /> */}
                        <TouchableWithoutFeedback onPress={handleViewPress}>
                            <View style={style.content}>
                                <Image
                                    style={style.icon}
                                    source={require('../../assets/note.png')}
                                    resizeMode='contain'
                                />
                                <TextInput
                                    ref={textInputRef}
                                    placeholder='메모'
                                    placeholderTextColor={colors.line}
                                    style={style.note}
                                    multiline
                                    onChangeText={text => setMemo(text)}
                                    value={memo}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
}

const style = StyleSheet.create({
    container: {
        position: 'absolute',
        paddingHorizontal: 16,
        width: fullWidth ,
        height: fullHeight,
        backgroundColor: 'white',
    },
    header: {
        marginVertical: 20 * height,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text
    },
    text: {
        fontSize: 16,
        color: colors.text
    },
    titleInput: {
        paddingHorizontal: 10,
        height: 40 * height,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.line,
        fontSize: 14
    },
    content: {
        flexDirection: 'row',
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
    note: {
        flex: 1,
        fontSize: 14
    }
});