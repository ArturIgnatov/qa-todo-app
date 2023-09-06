import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },

    sender: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    input: {
        width: '85%'
    },

    title: {
        fontWeight: "bold",
        textAlign: 'center',
        marginBottom: 16,
        fontSize: 16
    }
})
