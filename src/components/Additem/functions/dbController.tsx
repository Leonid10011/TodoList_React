import { TodoItemType } from "../../Todolist/types/types";

type SetTodoItemType = {
    title: string,
    date: string,
    notes: string
}

export function setItem (item: SetTodoItemType) {

};

export function getItems(): TodoItemType[] {   
    let result: TodoItemType[] = [];

    return result;
};


