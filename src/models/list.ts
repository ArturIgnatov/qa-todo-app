import {ITodo} from "./todo";

export interface IList {
    id: number;
    title: string;
    candidate_id: number
    todos?: ITodo[];
    created_at: string;
    updated_at: string;
}
