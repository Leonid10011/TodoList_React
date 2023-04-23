import React, { Ref, forwardRef, useEffect } from "react";
import styles from "./styles/style.module.css";
import { TodoItemProps, TodoListProps } from "./types/types";
import { updateTodoItem } from "../../databaseController/controller";

export const TodoList = forwardRef( function TodoList({ items, handleDelete, _id, category }: TodoListProps, ref: Ref<HTMLDivElement> ) {

    return(
        <div id={_id}>
            <div id={styles.main} ref={ref}>
                <p>{_id}</p>
                <ul>
                    {items.map(item => {
                        if(item.category === category)
                        return(
                            <TodoItem key={item.id} item={item} handleDelete={handleDelete}/>
                        )
                        else    
                            return
                        } 
                        )}
                </ul>
            </div>
        </div>
    )
} )
/**
 * @param param
 * @returns 
 * @todo add linebreak to long words ( wont linebreak themseleves!)
 */
const TodoItem = (function TodoItem({ item, handleDelete }: TodoItemProps) {
    const [checked, setChecked] = React.useState(item.checked);
    // change appearance of TodoItem when checked
    let activeItem = styles.listItem;
    let inactiveItem = styles.listItemDisabled;

    const handleChecked = () => {
        setChecked(!checked);
        // update the check attribute of item in database
        updateTodoItem({...item, checked: !checked});
    } 

    return(
        <li key={item.id} className={!checked ? activeItem : inactiveItem} id={item.id}>
            <div className={styles.itemTop}>
                <div className={styles.itemTitle}>
                    <span>{item.title}</span>
                </div>
                <div className={styles.itemDate}>
                    <span>{item.date}</span>
                </div>
                <div onClick={() => handleDelete(item)} className={styles.btn_expand}>
                    <i className={styles.gg_close}></i>
                </div>
            </div>
            <div className={styles.seperator}></div>
            <div className={styles.itemBottom}>
                <p className={styles.itemNotes} > {item.notes}</p>
                <div className={styles.itemCheck}>
                    <input type={"checkbox"} onChange={handleChecked} checked={checked}/>
                </div>
            </div>
        </li> 
    )
});