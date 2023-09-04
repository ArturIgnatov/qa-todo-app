import { FC, memo, useCallback, useState } from "react";
import { styles } from "./styles";
import { KeyboardAvoidingView, useWindowDimensions, View } from "react-native";
import {IconButton, TextInput} from "react-native-paper";
import { CategoryItem } from "./CategoryItem";
import { IList } from "../../models/list";
import { ApiService} from "../../services/api-service";
import { TCreateCategory, TRemoveCategory, TUpdateCategory } from "../../interfaces/actions";
import Modal from "react-native-modal";

interface IProps {
  isVisible: boolean;
  categories: IList[];
  createCategory: TCreateCategory;
  updateCategory: TUpdateCategory;
  removeCategory: TRemoveCategory;
  closeModal: () => void;
}

export const ModerateListModal: FC<IProps> = memo(({ isVisible , categories, createCategory, updateCategory, removeCategory, closeModal }) => {
  const [title, setTitle] = useState('');
  const [editableListId, setEditableListId] = useState<number | null>(null);
  const { width , height } = useWindowDimensions();

  const onChangeText = useCallback((value: string) => {
    setTitle(value);
  }, [])

  const onSelectCategory = useCallback((id: IList['id']) => {
    setEditableListId(id);
    const list = categories.find(el => el.id === id);
    setTitle(list?.title ?? '')
  }, [])

  const onCreateOrUpdateList = useCallback(() => {
    if (editableListId) {
      updateCategory(editableListId, { title })
    } else {
      createCategory({ title })
    }

    closeModal()
  }, [title, editableListId])

  const onRemoveCategory = useCallback((listId: IList['id']) => {
    removeCategory(listId)
  }, [])

  return (
    <Modal
      {...{ isVisible }}
      animationIn="slideInUp"
      animationOut='slideOutDown'
      style={styles.modal}
      deviceWidth={width}
      deviceHeight={height}
      statusBarTranslucent
      useNativeDriverForBackdrop
      onBackButtonPress={closeModal}
      useNativeDriver
    >
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={16} style={styles.container}>
        {categories.map(it => (
          <CategoryItem key={it.id} {...it} onPress={onSelectCategory} onPressRemove={onRemoveCategory} />
        ))}
        <View style={styles.controls}>
          <TextInput style={styles.controls__input} label="Новая категория" mode="outlined" value={title} {...{ onChangeText }} />
          <IconButton icon='plus' onPress={onCreateOrUpdateList} />
        </View>
      </KeyboardAvoidingView>
    </Modal>
  )
})
