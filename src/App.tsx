import React from "react";
import styles from "./App.module.css";
import { TodoList } from "./components/Todolist/index"
import { TodoItemType } from "./components/Todolist/types/types";
import { getTodoItems } from "./databaseController/controller";
import { AddItem } from "./components/Additem";
import { deleteTodoItem } from "./databaseController/controller";

function App() {
 
  const AddItemRef = React.useRef<HTMLDivElement>(null);
  const TodoListRef = React.useRef<HTMLDivElement>(null);

  const [todoItems, setTodoItems] = React.useState<TodoItemType[]>(new Array);

  React.useEffect(() => {
    var now: Date = new Date();
    var fullDaysSinceEpoch = Math.floor(now.getTime()/8.64e7);
    console.log(fullDaysSinceEpoch);
    const waitItems = async() => {
      let res = await getTodoItems();
      setTodoItems(res);
      if(TodoListRef.current){
        console.log(TodoListRef.current.children[1].children[0].children);
      }
    }
    waitItems();
  }, [])

  React.useEffect(() => {
    // Rerender if an item is added though child component
  },[todoItems]);

  const handleDelete = (item : TodoItemType) => {
    deleteTodoItem(item);
    let newTodos = [...todoItems].filter(
      todo => todo.id !== item.id
    );
    setTodoItems([...newTodos]);
  } 

  function openAddItem() {
    if(AddItemRef.current && TodoListRef.current){
      AddItemRef.current.style.width = "400px";
      AddItemRef.current.style.paddingLeft = "30px";
      TodoListRef.current.style.marginLeft = "400px";
    }
  }

  function closeAddItem() {
    if(TodoListRef.current && AddItemRef.current) {
      AddItemRef.current.style.width = "0";
      AddItemRef.current.style.paddingLeft = "0";
      TodoListRef.current.style.marginLeft = "0";
    }
  }

  return(
    <React.StrictMode>
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
    </React.StrictMode> 
  )
}

export default App;