import { Dimensions } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height"; 

export const colors = {
    background: '#F2F2F2',
    text: '#3F3F3F',
    line: '#ADADAD',
    sunday: '#DD4949',
    saturday: '#4949DD',
    primary: '#3A0E08',
    secondary: '#FFDB4F',
}

export const statusBarHeight = getStatusBarHeight();

export const height = (
    (Dimensions.get('window').height - statusBarHeight) * (1 / 749) // figma에서 사용한 세로길이
).toFixed(2);