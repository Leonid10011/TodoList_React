import { TodoItemType } from "../../Todolist/types/types";

export type SetTodoItemType = {
    title: string,
    date: string,
    notes: string,
    checked: boolean,
}

type SetTitleAction = {
    type: "SET_TITLE";
    payload: string,
}

type SetDateAction = {
    type: "SET_DATE";
    payload: string;
}

type SetNotesAction = {
    type: "SET_NOTES";
    payload: string;
}

export type InputWithLabelProps = {
    name: string,
    id: string,
    value: string,
    type: string,
    dispatchItem: React.Dispatch<TodoItemAction>,
    handleInput: (target: string, dispatch: React.Dispatch<TodoItemAction>) => void,
}

export type AddItemFormProps = {
    itemToAdd: SetTodoItemType,
    handleSetTodos: React.Dispatch<React.SetStateAction<TodoItemType[]>>,
    dispatch: React.Dispatch<TodoItemAction>,
    todos: TodoItemType[],
}

export type TodoItemAction = SetTitleAction | SetDateAction | SetNotesAction;