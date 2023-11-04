import { StyleSheet, View, Dimensions } from 'react-native';

import CustomCalendar from './src/component/CustomCalendar';
import { statusBarHeight } from './src/style/globalStyle';

export default function App() {

    return (
        <View style={styles.container}>
            <CustomCalendar />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        marginTop: statusBarHeight,
        flex: 1
    },
});
