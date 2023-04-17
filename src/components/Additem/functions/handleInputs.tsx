import React from "react";

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
/**
 * 
 * @param title 
 * @param dispatch 
 */
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
/**
 * 
 * @param date 
 * @param dispatch 
 */
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
/**
 * 
 * @param notes 
 * @param dispatch 
 */
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