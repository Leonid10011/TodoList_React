import React, { Ref, forwardRef } from "react";

import { InputWithLabelProps, AddItemFormProps } from "./types/types";
import { TodoItemType } from "../Todolist/types/types";

import { reducer } from "./reducer/reducer";
import  FirestoreController from "../../databaseController/controller";
import * as handler from "./functions/handleInputs";

import { withInputandLabel } from "./withInputandLablel";
import { FirebaseContext } from "../Firebase";
import Dropdown from "../Dropdown";

import styles from "./styles/index.module.css";

/**
 * @description AddItem Component page
 */
export const AddItem = forwardRef(function AddItem({ close, handleSetTodos, todos } : {
    close: () => void,
    handleSetTodos: React.Dispatch<React.SetStateAction<TodoItemType[]>>,
    todos: TodoItemType[],
    }, 
    ref: Ref<HTMLDivElement>
    ) {
    
    /**
     * @description  Initialize for type SetTodoItemType
     */
    const [itemToAdd, dispatch] = React.useReducer(reducer, {
        title: "",
        date: "",
        notes: "",
        checked: false,
        category: "",
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
                <AddItemForm 
                    itemToAdd={itemToAdd}
                    dispatch={dispatch} 
                    handleSetTodos={handleSetTodos} 
                    todos={todos}
                 />
            </div>
        </div>
    )
})

/**
 * 
 * @param param0 
 * @returns Form for the Additem Component
 */
function AddItemForm ( { itemToAdd, handleSetTodos, dispatch, todos }: AddItemFormProps) {
    
    const [activeCategory, setActiveCategory] = React.useState("");
    // Create new forestorecontroller to access db methods
    const firebaseContext = React.useContext(FirebaseContext);
    const fc = new FirestoreController(firebaseContext);

    React.useEffect(() => {
        console.log("Rerender");
    }, [activeCategory]);

    const handleOnSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        let toAdd = {
            title: itemToAdd.title,
            date: itemToAdd.date,
            notes: itemToAdd.notes,
            checked: itemToAdd.checked,
            category: activeCategory
        }

        // retrieve id to add todo with its new id to State in App component to avoid a fetch for this item  
        const updateTodoItemsState = async () => {
            let id = await fc.addTodoItem(toAdd);
            console.log(id);
            let newTodos = [...todos];
            newTodos.push({...toAdd, id: id});
            handleSetTodos([...newTodos]);
        }
        updateTodoItemsState();
    }
    
    return(
        <form onSubmit={handleOnSubmit} className={styles.addForm}>
            <Dropdown handleChange={setActiveCategory}/>
            <Input type={"text"} name={"Category"} id={"0"} value={activeCategory} dispatchItem={dispatch} handleInput={handler.handleCategory}/>
            <Input  type={"text"} name={"Title"} id={"1"} value={itemToAdd.title} dispatchItem={dispatch} handleInput={handler.handleTitle} />
            <Input  type={"text"} name={"Date"} id={"2"} value={itemToAdd.date} dispatchItem={dispatch} handleInput={handler.handleDate} />
            <TextArea  type={"text"} name={"Notes"} id={"3"} value={itemToAdd.notes} dispatchItem={dispatch} handleInput={handler.handleNotes} />
            <div className={styles.btn_submit}>
                <button type="submit" >Add Category</button>
            </div> 
        </form>
    )
}

const TextArea = withInputandLabel(
    (
        props: InputWithLabelProps, 
    ) => {
        const handleOnChangeArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            props.handleInput(event.target.value, props.dispatchItem);
        }

        return(
            <textarea 
                name="Text1" 
                cols={35} 
                rows={8}
                className={styles.itemTextArea} 
                id={props.id}
                value={props.value}
                onChange={handleOnChangeArea}
            ></textarea> 
        )
    }
)

const Input = withInputandLabel(
    (
        props: InputWithLabelProps
    ) => {
        const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            props.handleInput(event.target.value, props.dispatchItem);
        }

        return (
            <input
                className={styles.itemInput} 
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={handleOnChange} 
                maxLength={28}
            ></input>
        )
    }
)