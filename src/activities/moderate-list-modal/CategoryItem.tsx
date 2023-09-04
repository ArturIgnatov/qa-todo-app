import { IconButton, List, MD3Colors } from 'react-native-paper';
import { FC, memo } from "react";
import { IList } from "../../models/list";
import { styles } from "./styles";

interface IProps extends IList {
  onPress: (id: IList['id']) => void;
  onPressRemove: (id: IList['id']) => void;
}

export const CategoryItem: FC<IProps> = memo(({ id, title, todos, onPress, onPressRemove }) => {
  return (
    <List.Item
      {...{ title }}
      description={`Количество задач: ${todos?.length ?? 0}`}
      onPress={() => onPress(id)}
      style={styles.category}
      right={(props) =>
        <IconButton
          {...props}
          icon='delete'
          iconColor={MD3Colors.error50}
          onPress={() => onPressRemove(id)}
        />
    }
    />
  )
})
