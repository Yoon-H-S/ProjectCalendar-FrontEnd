import { StyleSheet, View } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height"; 

import CustomCalendar from './src/component/CustomCalendar';

export default function App() {
    return (
        <View style={styles.container}>
            <CustomCalendar />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: getStatusBarHeight(),
        marginHorizontal: 16,
    },
});
