import { db } from "../lib/firestore";
import { addDoc, getDocs, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { TodoItemType } from "../components/Todolist/types/types";
import { SetTodoItemType } from "../components/Additem/types/types";
/**
 * 
 * @param item 
 * @returns 
 */
export async function addTodoItem (item: SetTodoItemType): Promise<string> {
    try {
        if((typeof(item.title) === "string" && item.title !== "")
            && (new Date(item.date).toString() !== "Invalid Date") 
            && (typeof(item.notes) === "string")   
        ){
            const docRef = await addDoc(collection(db, "TodoItems"), {
                title: item.title,
                date: (item.date).toString(),
                notes: item.notes,
                checked: false,
            });

            console.log("Document written with ID: ", docRef.id);
            return docRef.id;
        }else {
            console.log("Error in data format.")
            return "";
        }   
    } catch(e) {
        console.error("Error adding document: ", e);
        return "";
    }
}
/**
 * 
 * @returns Promise for todoItems
 */
export async function getTodoItems (): Promise<TodoItemType[]> {
    const querySnapshot = await getDocs(collection(db, "TodoItems"));
    let result = querySnapshot.docs.map(
        doc => Object({
            id: doc.id,
            ...doc.data()
        })
    );
    console.log("Successfully get data.")
    return result
}
/**
 * 
 * @param item 
 */
export async function updateTodoItem (item: TodoItemType) {
    try {
        const todoRef = doc(db, "TodoItems", item.id);
    
        await updateDoc(todoRef, {
            checked: item.checked
        });

        console.log("Succesfull updated ckecked status of Item.");
    } catch(error){
        console.error("Failed to update Item.", error);
    }
}
/**
 * 
 * @param item 
 */
export async function deleteTodoItem ( item: TodoItemType) {
    try{
        await deleteDoc(doc(db, "TodoItems", item.id));
        console.log("Deleting document succesfull.")
    } catch(error){
        console.error("Error deleting document: ", error);
    }
}