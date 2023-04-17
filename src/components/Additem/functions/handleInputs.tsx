import React from "react";

type SetTodoItemType = {
    title: string,
    date: string,
    notes: string
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

type TodoItemAction = SetTitleAction | SetDateAction | SetNotesAction;

export const handleTitle = (
    title: string,
    dispatch: React.Dispatch<TodoItemAction>
) => {
    dispatch(
        {
            type: "SET_TITLE",
            payload: title,
        }
    );
}

export const handleDate = (
    date: string,
    dispatch: React.Dispatch<TodoItemAction>
) => {
    dispatch(
        {
            type: "SET_DATE",
            payload: date,
        }
    );
}

export const handleNotes = (
    notes: string,
    dispatch: React.Dispatch<TodoItemAction>
) => {
    dispatch(
        {
            type: "SET_NOTES",
            payload: notes,
        }
    );
}