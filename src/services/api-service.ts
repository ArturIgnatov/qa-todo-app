import axios, {AxiosInstance} from "axios";
import {ITodo} from "../models/todo";
import {IList} from "../models/list";

class ApiServiceClazz {
    private readonly instance: AxiosInstance;
    private boardId: string = '';

    constructor() {
        this.instance = axios.create({
            baseURL: 'http://qa-assignment.oblakogroup.ru/',
            headers: {
                Accept: 'application/json'
            }
        })
    }

    public setBoardId(boardId: string) {
        this.boardId = boardId;
    }

    public getList() {
        console.log('this.boardId', this.boardId)
        return this.instance.get(`board/${this.boardId}`)
    }

    public toggleTaskCompleted(taskId: string) {
        return this.instance.post(`todo/${taskId}`)
    }

    public createTaskOrListWithTask(listId: string, data: { title?: string; text?: string }) {
        return this.instance.patch(`project/`, {
            code: this.boardId,
            project: {
                ...data,
            }
        })
    }
}

export const ApiService = new ApiServiceClazz()