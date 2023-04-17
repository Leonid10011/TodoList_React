import React, { Ref, forwardRef } from "react";
import styles from "./style.module.css";
import { TodoItemProps, TodoListProps } from "./types/types";
import { updateTodoItem } from "../../databaseController/controller";

export const TodoList = forwardRef( function TodoList({ items, handleDelete }: TodoListProps, ref: Ref<HTMLDivElement> ) {

    return(
        <div id={styles.main} ref={ref}>
            <ul>
            {items.map( 
                    item => <TodoItem key={item.id} item={item} handleDelete={handleDelete}/> 
                )
            }
            </ul>
        </div>
    )
} )
/**
 * TODO: add linebreak to long words ( wont lienbreak themseleves!)
 * @param param0 
 * @returns 
 */
function TodoItem({ item, handleDelete }: TodoItemProps) {
    const [checked, setChecked] = React.useState(item.checked);

    let a = styles.listItem;
    let b = styles.listItemDisabled;
    
    const handleChecked = () => {
        setChecked(!checked);
        updateTodoItem({...item, checked: !checked});
    } 

    return(
        <li key={item.id} className={!checked ? a : b}>
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
}