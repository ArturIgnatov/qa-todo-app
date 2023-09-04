import axios, {AxiosInstance} from "axios";
import {ITodo} from "../models/todo";
import {IList} from "../models/list";
import {
    TCreateCategory,
    TCreateTodo,
    TRemoveCategory,
    TRemoveTodo,
    TUpdateCategory,
    TUpdateTodo
} from "../interfaces/actions";

export type ApiMethodAgs<T extends (...args: any[]) => Promise<any>> = Awaited<Parameters<T>>

class ApiServiceClazz {
    private readonly instance: AxiosInstance = axios.create({
        baseURL: 'http://mobile-dev.oblakogroup.ru/candidate/qa-mobile',
        headers: {
            Accept: 'application/json'
        }
    })

    public async getList() {
        try {
            const resp = await this.instance.get<IList[]>(`/list`)
            return resp.data
        } catch (e) {
            console.log('getList ERROR: ', e)
            throw e;
        }
    }

    public createCategory: TCreateCategory<Promise<IList>> = async (data) =>  {
        try {
            const resp = await this.instance.post<IList>(`/list`, data)
            return resp.data;
        } catch (e) {
            console.log('createCategory ERROR: ', e)
            throw e;
        }
    }


    public updateCategory: TUpdateCategory<Promise<IList>> = async (listId, data) => {
        try {
            const resp = await this.instance.patch<IList>(`/list/${listId}`, data)
            return resp.data
        } catch (e) {
            console.log('updateCategory ERROR: ', e)
            throw e;
        }
    }

    public removeCategory: TRemoveCategory<Promise<{ id: number }>> = async(listId) => {
        try {
            const resp = await this.instance.delete<{ id: number }>(`/list/${listId}`)
            return resp.data;
        } catch (e) {
            console.log('removeCategory ERROR: ', e)
            throw e;
        }
    }

    public createTodo: TCreateTodo<Promise<ITodo>> = async (listId, data) => {
        try {
            const resp = await this.instance.post<ITodo>(`/list/${listId}/todo`, data)
            return resp.data
        } catch (e) {
            console.log('createTodo ERROR: ', e)
            throw e;
        }
    }

    public updateTodo: TUpdateTodo<Promise<ITodo>> = async (listId, todoId, data) => {
        try {
            const resp = await this.instance.patch<ITodo>(`/list/${listId}/todo/${todoId}`, data)
            return resp.data
        } catch (e) {
            console.log('updateTodo ERROR: ', e)
            throw e;
        }
    }

    public removeTodo: TRemoveTodo<Promise<{ id: number }>> = async (listId, todoId) => {
        try {
            const resp = await this.instance.delete<{ id: number }>(`/list/${listId}/todo/${todoId}`)
            return resp.data;
        } catch (e) {
            console.log('removeTodo ERROR: ', e)
            throw e;
        }
    }
}

export const ApiService = new ApiServiceClazz()
