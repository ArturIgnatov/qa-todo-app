import { List } from "react-native-paper";
import { FC, memo } from "react";
import { IList } from "../../../models/list";
import { TodoItem } from "./todo-item/TodoItem";
import { TRemoveTodo, TUpdateTodo } from "../../../interfaces/actions";
import { ITodo } from "../../../models/todo";

interface IProps extends IList {
  updateTodo: TUpdateTodo;
  removeTodo: TRemoveTodo;
  editTodo: (todo: ITodo) => void;
}

export const Category: FC<IProps> = memo(({ title, todos, editTodo, removeTodo, updateTodo }) => {
  return (
    <List.Accordion
      {...{ title }}
      left={props => <List.Icon {...props} icon="folder" />}>
      {todos?.map(el => (
        <TodoItem key={el.id} {...el} onPress={updateTodo} onPressEdit={editTodo} onPressRemove={removeTodo} />
      ))}
    </List.Accordion>
  )
})
