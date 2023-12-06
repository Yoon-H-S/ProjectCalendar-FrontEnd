import React, { useState, useRef } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Image, Keyboard, Platform, TouchableWithoutFeedback, KeyboardAvoidingView, Alert, Modal, TouchableOpacity } from 'react-native';
import axios from 'axios';

import { colors, height, fullHeight, fullWidth, statusBarHeight } from '../style/globalStyle';
import ScheduleContent from './ScheduleContent';
import ScheduleDateTime from './ScheduleDateTime';
import server from '../../address';
import Repeat from './Repeat';

export default function AddSchedule({setIsAdd, userNum}) {
    const today = new Date();
    const [start, setStart] = useState(new Date(new Date().setHours(today.getHours() + 1, 0, 0)));
    const [end, setEnd] = useState(new Date(new Date().setHours(today.getHours() + 2, 0, 0)));
    const textInputRef = useRef(null);
    const [title, setTitle] = useState('');
    const [memo, setMemo] = useState('');
    const [repeatName, setRepeatName] = useState('반복 안 함');
    const [repeatValue, setRepeatValue] = useState({
        type: null,
        end: null
    });
    const [modalVisible, setModalVisible] = useState(false);

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
                // memo: memo,
                repType: repeatValue.type,
                repEnd: repeatValue.end
        }).then((response) => {
            console.log(response.data);
            setIsAdd(false);
        }).catch((error) => {
            console.log(error);
        });
    }

    const setRepeat = (type1, type2, num, date) => {
        var n = null;
        var e = null;
        
        switch(type1) {
            case 0:
                n = '반복 안 함';
                break;
            case 1:
                n = '매일 반복';
                break;
            case 2:
                n = '매주 반복';
                break;
            case 3:
                n = '매달 반복';
                break;
            case 4:
                n = '매년 반복';
                break;
        }

        if(type1 !== 0) {
            if(type2 === 1) {
                n += `, ${num}번 반복 후 종료`;
                e = num;
            } else if(type2 === 2) {
                n += `, ${date} 전까지 반복`;
                e = date;
            }
        }

        setRepeatValue({
            ...repeatValue,
            type: type1 === 0 ? null : type1,
            end: e
        });
        setRepeatName(n);
        setModalVisible(false);
    }

    return (
        <TouchableWithoutFeedback onPress={dismiss}>
            <View style={style.container}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {setModalVisible(!modalVisible)}}
                >          
                    <Repeat setModalVisible={setModalVisible} setRepeat={setRepeat} />
                </Modal>
                <KeyboardAvoidingView
                    behavior='height'
                    style={{flex: 1}}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 50 * height : 20 * height}
                >
                    <View style={style.header}>
                        <TouchableOpacity onPress={() => setIsAdd(false)}>
                            <Text style={style.text}>취소</Text>
                        </TouchableOpacity>
                        <Text style={style.title}>새로운 일정</Text>
                        <TouchableOpacity onPress={() => scheduleInsert()}>
                            <Text style={style.text}>추가</Text>
                        </TouchableOpacity>
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
                            text='알림 없음'
                            clickEvent={() => console.log("알림 클릭함")}
                        />
                        <ScheduleContent
                            imgSrc={require('../../assets/repeat.png')}
                            text={repeatName}
                            clickEvent={() => setModalVisible(true)}
                        />
                        <ScheduleContent
                            imgSrc={require('../../assets/location.png')}
                            text='장소 추가'
                            clickEvent={() => console.log("장소 클릭함")}
                        />
                        <ScheduleContent
                            imgSrc={require('../../assets/file.png')}
                            text='파일 첨부'
                            clickEvent={() => console.log("파일 클릭함")}
                        />
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
        marginTop: statusBarHeight,
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