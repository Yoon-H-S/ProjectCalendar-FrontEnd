import React from 'react';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function KakaoLogin(props) {
    const REST_API_KEY = 'c0f42d0672e0de7f9bf0c5f37aa96c27';
    const REDIRECT_URI = 'http://192.168.45.95:8080/api/kakao-api';

    const getCode = (target) => {
        const exp = 'code=';
        const condition = target.indexOf(exp);
        if (condition !== -1) {
            const requestCode = target.substring(condition + exp.length);
            requestToken(requestCode);
        }
    };

    const requestToken = async (request_code) => {
        const tokenUrl = "https://kauth.kakao.com/oauth/token";
        axios.post(tokenUrl, null, {
            params: {
                grant_type: 'authorization_code',
                client_id: REST_API_KEY,
                redirect_uri: REDIRECT_URI,
                code: request_code,
            }
        }).then((response) => {
            console.log(response.data.access_token);
            axios.post('http://192.168.45.95:8080/api/kakao-login', null, {
                params: {
                    token: response.data.access_token
                }
            }).then((response) => {
                storeData(response.data);
            }).catch((error) => {
                console.log(error);
            });
        }).catch((error) => {
            console.log(error);
        });
    };

    const storeData = async (number) => {
        try {
            await AsyncStorage.setItem('userNumber', number.toString());
            props.setNumber(number);
        } catch (e) {
            console.log(e);
        }
      }

    return (
        <WebView
            source={{uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`}}
            injectedJavaScript={`window.ReactNativeWebView.postMessage('message from webView')`} // onMessage를 실행시키기 위해 적용
            javaScriptEnabled
            onMessage={(event) => { // window.ReactNativeWebView.postMessage가 호출될 때 실행되는 함수.
                getCode(event.nativeEvent.url);
            }}
      />
    );
}
