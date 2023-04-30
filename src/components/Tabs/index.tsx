import React, { MouseEventHandler } from "react"

import TodoList from "../Todolist";
import { CategoryContext } from "../Categories";

import { TodoItemType } from "../Todolist/types/types";
import { CategoryType } from "../Categories/types/types";

import styles from "./styles.module.css";

type TabsProps = {
    items: TodoItemType[],
    handleDelete: (item: TodoItemType) => void,
}

function Tabs(props: TabsProps) {
    const categoriesContext = React.useContext(CategoryContext);
    const [categories, setCategories] = React.useState<CategoryType[]>([]);
    // Create a ref for each category, so we can create references for each todolist
    const childRefs = React.useMemo(() => {
        return (categories.map( () => React.createRef<HTMLDivElement>()))
    }, [categories])
    // Each category gets its own button, that actiavtes a tab
    const buttonRefs = React.useMemo(() => {
        return(categories.map(() => React.createRef<HTMLButtonElement>()))
    },[categories]);

    React.useEffect(() => {
        setCategories([...categoriesContext.categories]);
    }, [categoriesContext.categories]);

    React.useEffect(() => {
        console.log("Tabs: ", categoriesContext.categories);
        if(categories.length >0){
            /**
             * Each Category gets its own Button ref
             * AT start mak the first active, and rest is inactive
            */
           if(buttonRefs[0].current)
           buttonRefs[0].current.className += " active";
           childRefs.forEach( ref => {
               if(ref.current)
               ref.current.style.display = "none";
            });
            /**
             * The todolist for the first category gets visible 
            */
           if(childRefs[0].current)
           childRefs[0].current.style.display = "block";
        }
    }, [categories]);

    const openCategory = (event: React.MouseEvent) => {
        console.log("Open Category");
        let tabName = (event.target as HTMLButtonElement);
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
        let getTodoList = childRefs.filter(c => c.current?.parentElement?.id === tabName.id);
        console.log("TodoList: ", getTodoList, " tabName: ", tabName, " parent elements: ", childRefs[1].current?.parentElement);
        if(getTodoList.length > 0){
            if(getTodoList[0].current)
                getTodoList[0].current.style.display = "block";
        }

        (event.target as HTMLButtonElement).className += " active";
    }

    return(
        <>
            <div className={styles.tab}>
                { categories.map((category, index) => (
                    <button key={index}
                        id = {category.id}
                        name={category.category} 
                        className={styles.tablinks} 
                        onClick={openCategory} 
                        ref={buttonRefs[index]}
                        >{category.category}
                     </button>
                    ))}
            </div>
            <div>
                {
                    categories.map( (category, index) => (
                        <TodoList 
                        key={index} 
                        {...props} 
                        _id={category.id} 
                        category={category.category} 
                        ref={childRefs[index]}/>
                    ))
                }
            </div>
        </>
    )
}

export default Tabs;