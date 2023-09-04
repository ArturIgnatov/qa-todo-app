import { FlatList, NativeScrollEvent, NativeSyntheticEvent, RefreshControl, View } from "react-native";
import { AnimatedFAB, Appbar } from "react-native-paper";
import { useCallback, useEffect, useState } from "react";
import { ApiService } from "../../services/api-service";
import { styles } from "./styles";
import { IList } from "../../models/list";
import { Category } from "./category/Category";
import { CreateTodoModal } from "../create-todo-modal/CreateTodoModal";
import { ModerateListModal } from "../moderate-list-modal/ModerateListModal";
import {
    TCreateCategory,
    TCreateTodo,
    TRemoveCategory,
    TRemoveTodo,
    TUpdateCategory,
    TUpdateTodo
} from "../../interfaces/actions";
import {ITodo} from "../../models/todo";

export const MainActivity = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [categories, setCategories] = useState<IList[]>([]);
    const [isExtended, setIsExtended] = useState(false);
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [listModalVisible, setListModalVisible] = useState(false);
    const [editedTodo, setEditedTodo] = useState<ITodo | null>(null);

    useEffect(() => {
        fetchList()
    }, [])

    const fetchList = useCallback(() => {
        setIsLoading(true);

        ApiService.getList()
          .then(setCategories)
          .finally(() => setIsLoading(false))
    }, [])

    const refetchList = useCallback(() => {
        setIsRefreshing(true);

        ApiService.getList()
          .then(setCategories)
          .finally(() => setIsRefreshing(false))
    }, [])

    const toggleCreateModalVisible = useCallback(() => {
        setEditedTodo(null)
        setCreateModalVisible(prevState => !prevState)
    }, [])

    const toggleListModalVisible = useCallback(() => {
        setListModalVisible(prevState => !prevState)
    }, [])

    const renderItem = useCallback(({ item }: { index: number, item: IList }) => {
        return <Category {...item} {...{ removeTodo, updateTodo, editTodo }} />
    }, [])

    const keyExtractor = useCallback((item: IList) => {
        return item.id.toString();
    }, [])

    const editTodo = useCallback((todo: ITodo) => {
        toggleCreateModalVisible()
        setEditedTodo(todo)
    }, [])

    const onScroll = useCallback(({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentScrollPosition = Math.floor(nativeEvent?.contentOffset?.y) ?? 0;
        setIsExtended(currentScrollPosition <= 0);
    }, []);

    const updateCategory: TUpdateCategory = useCallback(async (listId, data) => {
        const resp = await ApiService.updateCategory(listId, data)
        console.log('UPDATE CATEGORY RESP', resp);
        setCategories(prev => prev.map(el => el.id === listId ? { ...el, ...data } : el))
    }, [])

    const removeCategory: TRemoveCategory = useCallback(async (id) => {
        const resp = await ApiService.removeCategory(id)
        console.log('REMOVE CATEGORY RESP', resp);
        setCategories(prev => prev.filter(el => el.id !== id))
    }, [])

    const createCategory: TCreateCategory = useCallback(async (data) => {
        const resp = await ApiService.createCategory(data)
        console.log('CREATE CATEGORY RESP', resp);
        setCategories(prev => [...prev, resp])
    }, [])

    const createTodo: TCreateTodo = async (listId, data) => {
        const resp = await ApiService.createTodo(listId, data)
        console.log('CREATE TODO RESP', resp);
        setCategories(prev => prev.map(el => el.id === resp.list_id ? {...el, todos: [...(el?.todos?? []), resp]} : el))
    }

    const updateTodo: TUpdateTodo = async (listId, todoId, data) => {
        const resp = await ApiService.updateTodo(listId, todoId, data);
        console.log('UPDATE TODO RESP', resp);
        setCategories(prev => prev.map(el =>
          el.id === resp.list_id
            ? {...el, todos: el.todos?.map(it => it.id === resp.id ? resp : it) }
            : el
        ));
    }

    const removeTodo: TRemoveTodo = async (listId, todoId) => {
        const resp = await ApiService.removeTodo(listId, todoId);
        console.log('REMOVE TODO RESP', resp);

        setCategories((prev) => prev.map(el =>
          el.id == listId
            ? {
                ...el,
                todos: el.todos?.filter(it => it.id !== todoId)
            }
            : el
          )
        )
    }

    return (
        <View style={styles.container}>
            <Appbar.Header mode='small' elevated={true}>
                <Appbar.Content title="Задачи" />
                <Appbar.Action icon="playlist-edit" onPress={toggleListModalVisible} />
            </Appbar.Header>
            <FlatList
              data={categories}
              style={styles.list}
              refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={refetchList} />}
              {...{ onScroll, keyExtractor, renderItem }}
            />
            <AnimatedFAB
              icon="plus"
              label="Создать задачу"
              extended={!isExtended}
              onPress={toggleCreateModalVisible}
              visible={true}
              animateFrom={'right'}
              iconMode={'dynamic'}
              style={[styles.fab]}
            />
            <CreateTodoModal
              isVisible={createModalVisible}
              todo={editedTodo}
              {...{ categories, createTodo, updateTodo, removeTodo }}
              closeModal={toggleCreateModalVisible}
            />
            <ModerateListModal
              isVisible={listModalVisible}
              {...{ categories, createCategory, removeCategory, updateCategory }}
              closeModal={toggleListModalVisible}
            />
        </View>
    )
}
