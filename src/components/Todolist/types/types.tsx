import { Firestore } from "firebase/firestore";

export type TodoItemType = {
    id: string,
    title: string,
    date: string,
    notes: string,
    checked: boolean,
    category: string,
}

export type TodoListProps = {
    items: TodoItemType[],
    handleDelete: (item: TodoItemType) => void,
    _id: string,
    category: string,
}

export type TodoItemProps = {
    item: TodoItemType,
    handleDelete: (item: TodoItemType) => void;
}