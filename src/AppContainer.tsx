import { View } from "react-native";
import {Button, IconButton, Modal, Portal, Text, TextInput} from 'react-native-paper'
import {useCallback, useState} from "react";
import {styles} from "./styles";
import {ApiService} from "./services/api-service";
import {MainActivity} from "./activities/main-activity/MainActivity";

export const AppContainer = () => {
    const [boardId, setBoardId] = useState('qa-mobile')
    const [page, setPage] = useState<'main' | 'enterBoard'>('enterBoard')

    const handleBoardChange = useCallback((value: string) => {
        setBoardId(value)
    }, []);

    const installBoardId = () => {
        ApiService.setBoardId(boardId)
        setPage('main')
    }

    if (page === 'main') {
        return <MainActivity />
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Для дальнейше работы требуется ввести board id</Text>
            <View style={styles.sender}>
                <TextInput
                    value={boardId}
                    style={styles.input}
                    label="Board"
                    placeholder="Please enter board id"
                    mode="outlined"
                    onChangeText={handleBoardChange}
                />
                <IconButton disabled={!boardId.trim().length} icon="plus" mode='contained-tonal' onPress={installBoardId} />
            </View>
        </View>
    )
}