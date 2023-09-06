import { MainActivity } from "./activities/main-activity/MainActivity";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { styles } from "./styles";
import {ActivityIndicator, HelperText, IconButton, Text, TextInput} from "react-native-paper";
import { ApiService } from "./services/api-service";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AppContainer = () => {
    const [loading, setLoading] = useState(true);
    const [hasBoard, setHasBoard] = useState(false);
    const [board, setBoard] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('@board').then(resp => {
            if (resp) {
                ApiService.setEndPoint(resp);
                setHasBoard(true)
            }
        }).finally(() => setLoading(false))
    }, []);

    const onChangeText = (text: string) => {
        setBoard(text)
    }

    const saveBoard = () => {
        AsyncStorage.setItem('@board', board);
        ApiService.setEndPoint(board)
        setHasBoard(true)
    }

    if (loading) {
        return (
          <View style={styles.container}>
              <ActivityIndicator animating={true} />
          </View>
        )
    }

    if (!hasBoard) {
        return  (
          <View style={styles.container}>
              <Text style={styles.title}>Этот экран не является тестовым! Для того что бы продолжить, введите свое имя и фамилию через тире:</Text>
              <View style={styles.sender}>
                  <View style={styles.input}>
                      <TextInput label="Name" mode='outlined' textContentType="URL" value={board} onChangeText={onChangeText} />
                      <HelperText type="info" visible>
                         Пример: sergey-ivanov. Запрещается использовать другой формат!
                      </HelperText>
                  </View>
                  <IconButton icon="send" disabled={!board.trim().length} onPress={saveBoard} />
              </View>
          </View>
        )
    }

    return <MainActivity />
}
