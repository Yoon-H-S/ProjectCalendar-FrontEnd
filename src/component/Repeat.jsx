import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Platform, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { colors, height } from '../style/globalStyle';

export default function Repeat({ setModalVisible, setRepeat }) {
    const [selectedId, setSelectedId] = useState(0);
    const [selectedId2, setSelectedId2] = useState(0);
    const [endD, setEndD] = useState(new Date());
    const [endN, setEndN] = useState('');
    const [show, setShow] = useState(false);

    const changeDate = ({type}, selectedDate) => {
        if(Platform.OS === 'android') {
            setShow(false);
        }

        if (type === 'set') {
            setEndD(selectedDate);
        }
    };

    const setEndDate = () => {
        setSelectedId2(2);
        setShow(true);
    }

    return(
        <>
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <KeyboardAvoidingView
                    behavior='padding'
                    style={{flex: 1}}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 30 * height : 20 * height}
                >
                    <View style={style.centeredView}>
                        <View style={style.modalView}>
                            <Text style={style.modalTitle}>반복</Text>
                            <TouchableOpacity style={style.modalContent} onPress={() => {setSelectedId(0)}}>
                                <Text style={selectedId === 0 && style.selected}>반복 안 함</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.modalContent} onPress={() => {setSelectedId(1)}}>
                                <Text style={selectedId === 1 && style.selected}>매일</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.modalContent} onPress={() => {setSelectedId(2)}}>
                                <Text style={selectedId === 2 && style.selected}>매주</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.modalContent} onPress={() => {setSelectedId(3)}}>
                                <Text style={selectedId === 3 && style.selected}>매달</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={style.modalContent} onPress={() => {setSelectedId(4)}}>
                                <Text style={selectedId === 4 && style.selected}>매년</Text>
                            </TouchableOpacity>
                            {selectedId !== 0 && 
                                <>
                                    <Text style={style.subTitle}>반복 종료</Text>
                                    <TouchableOpacity style={style.modalContent} onPress={() => {setSelectedId2(0)}}>
                                        <Text style={selectedId2 === 0 && style.selected}>계속 반복</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={style.modalContent} onPress={() => {setSelectedId2(1);}}>
                                        <Text style={selectedId2 === 1 && style.selected}>반복 횟수</Text>
                                        {selectedId2 === 1 &&
                                            <TextInput
                                                style={{paddingTop: 5, borderBottomColor: colors.line, borderBottomWidth: 0.5, width: 200, height: 40 * height}}
                                                placeholder='횟수 입력'
                                                placeholderTextColor={colors.line}
                                                onChangeText={text => setEndN(text)}
                                                value={endN}
                                            />
                                        }
                                    </TouchableOpacity>
                                    <TouchableOpacity style={style.modalContent} onPress={() => {setEndDate()}}>
                                        <Text style={selectedId2 === 2 && style.selected}>종료 날짜</Text>
                                        {selectedId2 === 2 &&
                                            <>
                                                {show && <DateTimePicker
                                                    mode='date'
                                                    display='spinner'
                                                    value={endD}
                                                    onChange={changeDate}
                                                    locale='ko'
                                                    style={{width: 270}}
                                                />}
                                                {Platform.OS === 'android' &&
                                                    <Text style={{paddingTop: 5}}>
                                                        {new Date(endD.getTime() + (1000 * 60 * 60 * 9)).toISOString().substring(0, 10)}
                                                    </Text>
                                                }
                                            </>
                                        }
                                    </TouchableOpacity>
                                </>
                            }
                            
                            <TouchableOpacity style={style.ok} onPress={() => setRepeat(selectedId, selectedId2, endN, new Date(endD.getTime() + (1000 * 60 * 60 * 9)).toISOString().substring(0, 10))}>
                                <Text>확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </>
        
    );
}

const style = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        margin: 20 * height,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 30 * height,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 10 * height
    },
    modalContent: {
        width: 300,
        paddingVertical: 10 * height,
        borderBottomWidth: 0.5,
        borderBottomColor: colors.line,
        paddingHorizontal: 15
    },
    selected: {
        fontWeight: '900'
    },
    subTitle: {
        marginTop: 30 * height,
        marginBottom: 10 * height,
        fontSize: 16,
    },
    ok: {
        marginTop: 10, 
        width: 50, 
        height: 30, 
        color: colors.primary, 
        backgroundColor: colors.secondary, 
        borderRadius: 15, 
        alignItems: 'center', 
        justifyContent: 'center'
    }
});