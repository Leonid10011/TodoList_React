import React, { MouseEventHandler } from "react"
import { TodoList } from "../Todolist";
import { TodoItemType } from "../Todolist/types/types";

import styles from "./styles.module.css";

const INITIAL_CATEGORIES = ["main", "sec"]

type TabsProps = {
    items: TodoItemType[],
    handleDelete: (item: TodoItemType) => void
}

function Tabs(props: TabsProps) {
    const [categories, setCategories] = React.useState<string[]>(INITIAL_CATEGORIES);
    // Create a ref for each category, so we can create references for each todolist
    const childRefs = React.useMemo(() => {
        return (categories.map( (c) => React.createRef<HTMLDivElement>()))
    }, [categories])

    const buttonRefs = React.useMemo(() => {
        return(categories.map(() => React.createRef<HTMLButtonElement>()))
    },[categories]);

    React.useEffect(() => {
        if(buttonRefs[0].current)
            buttonRefs[0].current.className += " active";
        childRefs.forEach( ref => {
            if(ref.current)
                ref.current.style.display = "none";
        });
        if(childRefs[0].current)
            childRefs[0].current.style.display = "block";
    }, []);

    const openCategory = (event: React.MouseEvent) => {
        let tabName = (event.target as HTMLButtonElement).name;
        // hide all todolists
        childRefs.forEach( ref => {
            if(ref.current)
                ref.current.style.display = "none";
        });
        // remove class activ from all tablinks
        buttonRefs.forEach(ref => {
            if(ref.current)
                ref.current.className = ref.current.className.replace(" active", "");
        });
        // show current tab and add an active class to button that opened it
        let getTodoList = childRefs.filter(c => c.current?.parentElement?.id === tabName);
        if(getTodoList[0].current)
            getTodoList[0].current.style.display = "block";

        (event.target as HTMLButtonElement).className += " active";
    }

    return(
        <>
            <div className={styles.tab}>
                { categories.map((cat) => (
                    <button key={cat} name={cat} className={styles.tablinks} onClick={openCategory} ref={buttonRefs[categories.indexOf(cat)]}>{cat}</button>
                    ))}
            </div>
            <div>
                <TodoList key={"te"} {...props} _id="main" category={categories[0]} ref={childRefs[0]}/>
                <TodoList key={"t"} {...props} _id="sec" category={categories[1]} ref={childRefs[1]}/>
            </div>
        </>
    )
}

export default Tabs;