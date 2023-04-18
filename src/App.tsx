import React from "react";
import styles from "./App.module.css";
import { TodoList } from "./components/Todolist/index"
import { TodoItemType } from "./components/Todolist/types/types";
import { getTodoItems } from "./databaseController/controller";
import { AddItem } from "./components/Additem";
import { deleteTodoItem } from "./databaseController/controller";

function App() {
  // get refs for both main children to controller the sidebar slide
  const AddItemRef = React.useRef<HTMLDivElement>(null);
  const TodoListRef = React.useRef<HTMLDivElement>(null);

  const [todoItems, setTodoItems] = React.useState<TodoItemType[]>(new Array);

  React.useEffect(() => {
    const waitItems = async() => {
      let res = await getTodoItems();
      setTodoItems(res);
    }
    waitItems();
  }, [])

  React.useEffect(() => {
    // Rerender if an item is added
  },[todoItems]);

  const handleDelete = (item : TodoItemType) => {
    deleteTodoItem(item);
    let newTodos = [...todoItems].filter(
      todo => todo.id !== item.id
    );
    setTodoItems([...newTodos]);
  } 

  /**
   *  Open sidebar
   */
  function openAddItem() {
    if(AddItemRef.current && TodoListRef.current){
      AddItemRef.current.style.width = "100%";
      TodoListRef.current.style.marginLeft = "100%";
    }
  }
  /**
   * Close sidebar
   */
  function closeAddItem() {
    if(TodoListRef.current && AddItemRef.current) {
      AddItemRef.current.style.width = "0";
      TodoListRef.current.style.marginLeft = "0";
    }
  }

  return(

      <>
        <AddItem close={closeAddItem} handleSetTodos={setTodoItems} todos={todoItems} ref={AddItemRef}/>
        <div id={styles.main} ref={TodoListRef}>
          <div className={styles.main_header}>
            <h1 className={styles.title}>Todo-List</h1>
            <button onClick={openAddItem} className={styles.main_header_btn}>Add</button>
          </div>
          <TodoList items={todoItems} handleDelete={handleDelete}/>
        </div>
      </>

  )
}

export default App;