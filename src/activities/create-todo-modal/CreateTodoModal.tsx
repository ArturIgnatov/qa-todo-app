import {FC, useCallback, useEffect, useState} from "react";
import {Appbar, RadioButton, Text, TextInput} from "react-native-paper";
import { useWindowDimensions, View } from "react-native";
import { styles } from "./styles";
import Modal from 'react-native-modal';
import {IList} from "../../models/list";
import {TCreateTodo, TRemoveTodo, TUpdateTodo} from "../../interfaces/actions";
import {ITodo} from "../../models/todo";

interface IProps {
  isVisible: boolean;
  todo?: ITodo | null;
  categories: IList[];
  createTodo: TCreateTodo;
  updateTodo: TUpdateTodo;
  removeTodo: TRemoveTodo;
  closeModal: () => void;
}

export const CreateTodoModal: FC<IProps> = ({ isVisible , todo, categories, createTodo, updateTodo, removeTodo, closeModal }) => {
  const [text, setText] = useState('');
  const [listId, setListId] = useState<string>( '');
  const { width , height } = useWindowDimensions();

  useEffect(() => {
    if (todo) {
      setText(todo.text)
      setListId(todo.list_id.toString())
    } else {
      setText('')
      setListId('')
    }
  }, [todo]);

  const handleTextChange = useCallback((value: string) => {
    setText(value)
  }, []);

  const onCreateOrUpdateTodo = () => {
    if (!listId) {
      return
    }

    if (todo) {
      const nextListId = +listId;

      if (todo.list_id !== nextListId) {
        removeTodo(todo.list_id, todo.id)
        createTodo(nextListId, { text, checked: todo.checked })
      } else {
        updateTodo(todo.list_id, todo.id, { text })
      }
    } else {
      createTodo(+listId, { text, checked: false })
    }

    closeModal()
  }

  return (
    <Modal
      {...{ isVisible }}
      animationIn="slideInRight"
      animationOut='slideOutRight'
      style={styles.modal}
      deviceWidth={width}
      deviceHeight={height}
      statusBarTranslucent
      useNativeDriver
      backdropOpacity={0}
    >
      <Appbar.Header mode='small' elevated={true}>
        <Appbar.BackAction onPress={closeModal} />
        <Appbar.Content title="Создание задачи" />
        <Appbar.Action icon="check" disabled={!listId} onPress={onCreateOrUpdateTodo} />
      </Appbar.Header>
      <View style={styles.container}>
        <TextInput label="Задача" mode="outlined" value={text} onChangeText={handleTextChange} />
        <Text style={styles.title} variant="titleMedium" suppressHighlighting>Категория</Text>
        <RadioButton.Group  onValueChange={setListId} value={listId}>
          {categories.map(el => (
            <RadioButton.Item key={el.id} label={el.title} value={el.id.toString()} />
          ))}
        </RadioButton.Group>
      </View>
    </Modal>
  )
}
