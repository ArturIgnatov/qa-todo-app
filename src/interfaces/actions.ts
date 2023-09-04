import { IList } from "../models/list";
import { ITodo } from "../models/todo";

export type TCreateCategory<T = void> = (data: Pick<IList, 'title'>) => T;
export type TUpdateCategory<T = void> = (listId: IList['id'], data: Pick<IList, 'title'>) => T;
export type TRemoveCategory<T = void> = (id: IList['id']) => T;
export type TCreateTodo<T = void> = (listId: IList['id'], data: Pick<ITodo, 'text' | 'checked'>) => T;
export type TUpdateTodo<T = void> = (listId: IList['id'], todoId: ITodo['id'], data: Partial<Pick<ITodo, 'text' | 'checked' | 'list_id'>>) => T;
export type TRemoveTodo<T = void> = (listId: IList['id'], todoId: ITodo['id']) => T;
