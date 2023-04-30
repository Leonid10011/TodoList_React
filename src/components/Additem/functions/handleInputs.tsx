import React from "react";
import { TodoItemAction } from "../types/types";
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
/**
 * 
 * @param category 
 * @param dispatch 
 */
export const handleCategory = (
    category: string,
    dispatch: React.Dispatch<TodoItemAction>
) => {
    dispatch(
        {
            type: "SET_CATEGORY",
            payload: category,
        }
    );
}