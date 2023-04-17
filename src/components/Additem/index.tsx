import React, { Ref, forwardRef } from "react";
import { reducer } from "./reducer/reducer";
import { InputWithLabelProps, AddItemFormProps } from "./types/types";
import { TodoItemType } from "../Todolist/types/types";
import * as handler from "./functions/handleInputs";
import styles from "./styles/index.module.css";
import { addTodoItem } from "../../databaseController/controller";

export const AddItem = forwardRef(function AddItem({ close, handleSetTodos, todos } : {
    close: () => void,
    handleSetTodos: React.Dispatch<React.SetStateAction<TodoItemType[]>>,
    todos: TodoItemType[],
    }, 
    ref: Ref<HTMLDivElement>
    ) {

    const [itemToAdd, dispatch] = React.useReducer(reducer, {
        title: "",
        date: "",
        notes: "",
        checked: false,
    })

    return(
        <div className={styles.container} ref={ref}>
            <div className={styles.btn_expand} onClick={close}>
                <i className={styles.gg_close}></i>
            </div>
            <div className={styles.header}>
                <span>Create new Task</span>
            </div>
            <div className={styles.addItemBody}>
                <AddItemForm itemToAdd={itemToAdd} dispatch={dispatch} handleSetTodos={handleSetTodos} todos={todos}/>
            </div>
        </div>
    )
})

function AddItemForm ( { itemToAdd, handleSetTodos, dispatch, todos }: AddItemFormProps) {
    const handleOnSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        let toAdd = {
            title: itemToAdd.title,
            date: itemToAdd.date,
            notes: itemToAdd.notes,
            checked: itemToAdd.checked,
        }
        // retrieve id to add todo with its new id to State in App component to avoid a fetch for this item  
        const updateTodoItemsState = async () => {
            let id = await addTodoItem(toAdd);
            console.log(id);
            let newTodos = [...todos];
            newTodos.push({...toAdd, id: id});
            handleSetTodos([...newTodos]);
        }
        updateTodoItemsState();
    }

    return(
        <form onSubmit={handleOnSubmit} className={styles.addForm}>
            <InputWithLabel  type={"text"} name={"Title"} id={"1"} value={itemToAdd.title} dispatchItem={dispatch} handleInput={handler.handleTitle} />
            <InputWithLabel  type={"text"} name={"Date"} id={"2"} value={itemToAdd.date} dispatchItem={dispatch} handleInput={handler.handleDate} />
            <InputWithLabel  type={"text"} name={"Notes"} id={"3"} value={itemToAdd.notes} dispatchItem={dispatch} handleInput={handler.handleNotes} />
            <div className={styles.btn_submit}>
                <button type="submit" >Submit</button>
            </div>
        </form>
    )
}

function InputWithLabel(
    { 
        name,
        id,
        value,
        type,
        dispatchItem,
        handleInput,
     } : InputWithLabelProps  
) {

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleInput(event.target.value, dispatchItem);
    }

    const handleOnChangeArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        handleInput(event.target.value, dispatchItem);
    }

    React.useEffect(() => {
        if(name === "Date")
            dispatchItem({
                type: "SET_DATE",
                payload: (new Date()).toDateString(),
            });
    }, [])

    return(
        <div className={styles.inputWithLabel} id={styles.sidebar}>
            <label htmlFor={id} className={styles.itemLabel}>{name}</label>
            { name === "Notes" ? 
            <textarea 
                name="Text1" 
                cols={35} 
                rows={8}
                className={styles.itemTextArea} 
                id={id}
                value={value}
                onChange={handleOnChangeArea}
                
                ></textarea> 
            : <input
                className={styles.itemInput} 
                type={type}
                id={id}
                value={value}
                onChange={handleOnChange} 
                maxLength={28}
            />}
        </div>
    )
}