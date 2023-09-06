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
    private url = 'http://mobile-dev.oblakogroup.ru/candidate/';

    private instance = {
        get: <T>(url: string) => {
            return fetch(this.url + url, { method: 'GET',  headers: { Accept: 'application/json', 'Content-Type': 'application/json' } })
        },
        delete: <T>(url: string) => {
            return fetch(this.url + url, { method: 'DELETE',  headers: { Accept: 'application/json', 'Content-Type': 'application/json' } })
        },
        post: <T>(url: string, data?: any) => {
            return fetch(this.url + url, { method: 'POST', body: JSON.stringify(data), headers: { Accept: 'application/json', 'Content-Type': 'application/json' } })
        },
        patch: <T>(url: string, data: any) => {
            return fetch(this.url + url, { method: 'PATCH', body: JSON.stringify(data),  headers: { Accept: 'application/json', 'Content-Type': 'application/json' } })
        }
    }

    public setEndPoint = (boardId: string) => {
        this.url = this.url + boardId;
    }

    public async getList() {
        try {
            const resp = await this.instance.get(`/list`)
            return await resp.json() as Promise<IList[]>;
        } catch (e) {
            console.log('getList ERROR: ', e)
            throw e;
        }
    }

    public createCategory: TCreateCategory<Promise<IList>> = async (data) =>  {
        try {
            const resp = await this.instance.post<IList>(`/list`, data)
            return await resp.json() as Promise<IList>;
        } catch (e) {
            console.log('createCategory ERROR: ', e)
            throw e;
        }
    }


    public updateCategory: TUpdateCategory<Promise<IList>> = async (listId, data) => {
        try {
            const resp = await this.instance.patch<IList>(`/list/${listId}`, data)
            return await resp.json() as Promise<IList>
        } catch (e) {
            console.log('updateCategory ERROR: ', e)
            throw e;
        }
    }

    public removeCategory: TRemoveCategory<Promise<{ id: number }>> = async(listId) => {
        try {
            await this.instance.delete<{ id: number }>(`/list/${listId}`)
            return { id: listId }
        } catch (e) {
            console.log('removeCategory ERROR: ', e)
            throw e;
        }
    }

    public createTodo: TCreateTodo<Promise<ITodo>> = async (listId, data) => {
        try {
            const resp = await this.instance.post<ITodo>(`/list/${listId}/todo`, data)
            return await resp.json() as Promise<ITodo>
        } catch (e) {
            console.log('createTodo ERROR: ', e)
            throw e;
        }
    }

    public updateTodo: TUpdateTodo<Promise<ITodo>> = async (listId, todoId, data) => {
        try {
            const resp = await this.instance.patch<ITodo>(`/list/${listId}/todo/${todoId}`, data)
            return await resp.json() as Promise<ITodo>
        } catch (e) {
            console.log('updateTodo ERROR: ', e)
            throw e;
        }
    }

    public removeTodo: TRemoveTodo<Promise<{ id: number }>> = async (listId, todoId) => {
        try {
            await this.instance.delete<{ id: number }>(`/list/${listId}/todo/${todoId}`)
            return { id: todoId }
        } catch (e) {
            console.log('removeTodo ERROR: ', e)
            throw e;
        }
    }
}

export const ApiService = new ApiServiceClazz()
