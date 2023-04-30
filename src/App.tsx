import React from "react";
import styles from "./App.module.css";
import { TodoItemType } from "./components/Todolist/types/types";
import { AddItem } from "./components/Additem";
import * as ROUTES from "../config";
import Tabs from "./components/Tabs";
import { FirebaseContext } from "./components/Firebase";
import TestComponent from "./components/TestComponent";
import FirestoreController from "./databaseController/controller";
import { CategoryContext } from "./components/Categories";

function App() {
  // get refs for both main children to controller the sidebar slide
  const AddItemRef = React.useRef<HTMLDivElement>(null);

  const [todoItems, setTodoItems] = React.useState<TodoItemType[]>(new Array);
  const [categories, setCategories] = React.useState<string[]>(["Main", "Sec"]);

  const firebaseContext = React.useContext(FirebaseContext);
  const fc = new FirestoreController(firebaseContext);

  React.useEffect(() => {
    const waitItems = async() => {
      let res = await fc.getTodoItems();
      setTodoItems(res);
    }
    waitItems();
  }, [])

  React.useEffect(() => {
  // Rerender if an item is added
  },[todoItems]);

  const handleDelete = (item : TodoItemType) => {
    fc.deleteTodoItem(item);
    let newTodos = [...todoItems].filter(
      todo => todo.id !== item.id
    );
    setTodoItems([...newTodos]);
  } 
  /**
   * 
   */
  /**
   *  Open sidebar
   */
  function openAddItem() {
    if(AddItemRef.current){
      AddItemRef.current.style.width = "100%";
    }
  }
  /**
   * Close sidebar
   */
  function closeAddItem() {
    if(AddItemRef.current) {
      AddItemRef.current.style.width = "0";
    }
  }

  return(

      <CategoryContext.Provider value={categories}>
        <AddItem close={closeAddItem} handleSetTodos={setTodoItems} todos={todoItems} ref={AddItemRef}/>
        <p>{ROUTES.default.VERSION}</p>
        <div id={styles.main}>
          <div className={styles.main_header}>
            <h1 className={styles.title}>Todo-List</h1>
            <button onClick={openAddItem} className={styles.main_header_btn}>Add</button>
          </div>
          <Tabs items={todoItems} handleDelete={handleDelete}/>
        </div>
      </CategoryContext.Provider>

  )
}

//<TodoList items={todoItems} handleDelete={handleDelete}/>
export default App;