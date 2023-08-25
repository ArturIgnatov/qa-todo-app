import {ITodo} from "./todo";

export interface IList {
    id: number;
    title: string;
    board_id: number
    created_at: string;
    updated_at: string;
}