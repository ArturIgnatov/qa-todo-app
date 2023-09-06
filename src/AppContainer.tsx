import { MainActivity } from "./activities/main-activity/MainActivity";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { styles } from "./styles";
import {ActivityIndicator, HelperText, IconButton, Text, TextInput} from "react-native-paper";
import { ApiService } from "./services/api-service";
import AsyncStorage from "@react-native-async-storage/async-storage";

const genBoard = () => {
    let password = "";
    const symbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < symbols.length; i++){
        password += symbols.charAt(Math.floor(Math.random() * symbols.length));
    }
    return password;
}


const BOARD_KEY = '@board';

export const AppContainer = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AsyncStorage.getItem(BOARD_KEY).then(async resp => {
            if (resp) {
                ApiService.setEndPoint(resp);
                setLoading(false)
            } else {
                const generatedBoard = genBoard();
                await AsyncStorage.setItem(BOARD_KEY, generatedBoard);
                ApiService.setEndPoint(generatedBoard);
                setLoading(false)
            }
        });
    }, []);

    if (loading) {
        return (
          <View style={styles.container}>
              <ActivityIndicator animating={true} />
          </View>
        )
    }

    return <MainActivity />
}
