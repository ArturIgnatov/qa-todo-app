import {StyleSheet} from "react-native";
import {MD3Colors} from "react-native-paper";

export const styles = StyleSheet.create({
    modal: {
        flex: 1,
        margin: 0,
        padding: 0,
        height: '100%',
        width: '100%',
    },

    container: {
        flex: 1,
        backgroundColor: MD3Colors.secondary100,
        paddingHorizontal: 16,
        paddingVertical: 16,
    },

    title: {
        marginVertical: 8,
    }
})
