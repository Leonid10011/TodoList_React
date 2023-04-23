export type TodoItemType = {
    id: string,
    title: string,
    date: string,
    notes: string,
    checked: boolean,
}

export type TodoListProps = {
    items: TodoItemType[],
    handleDelete: (item: TodoItemType) => void,
    _id: string,
}

export type TodoItemProps = {
    item: TodoItemType,
    handleDelete: (item: TodoItemType) => void;
}