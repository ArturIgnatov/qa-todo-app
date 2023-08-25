import { View } from "react-native";
import { Text, Appbar } from "react-native-paper";
import { useEffect, useState } from "react";
import { ApiService } from "../../services/api-service";
import { styles } from "./styles";
import App from "../../../App";

export const MainActivity = () => {
    const [list, setList] = useState([]);

    useEffect(() => {
        ApiService.getList().then((resp) => {
            console.log('resp', resp.data);
        })
    }, [])

    return (
        <View style={styles.container}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {}} />
                <Appbar.Content title="Title" />
                <Appbar.Action icon="plus" onPress={() => {}} />
            </Appbar.Header>
        </View>
    )
}