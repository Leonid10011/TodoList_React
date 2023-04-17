import { SetTodoItemType, TodoItemAction } from "../types/types";

export const reducer = (state: SetTodoItemType, action: TodoItemAction) => {
    switch(action.type) {
        case "SET_TITLE":
            return Object({
                ...state,
                title: action.payload,
            });
        case "SET_DATE":
            return Object({
                ...state,
                date: action.payload,
            });
        case "SET_NOTES":
            return Object({
                ...state,
                notes: action.payload,
            });
        default:
            return state;
    }
}