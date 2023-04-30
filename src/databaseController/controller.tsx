import React from "react";
import { TodoItemType } from "../components/Todolist/types/types";
import { SetTodoItemType } from "../components/Additem/types/types";
import Firebase from "../components/Firebase";

/**
 * 
 * @param item 
 * @returns 
 */
class FirestoreController{
    firebase: Firebase;
        constructor(firebase: Firebase){
            this.firebase = firebase;
        }

            addTodoItem = async (item: SetTodoItemType) =>  {
                try {
                    if((typeof(item.title) === "string" && item.title !== "")
                        && (new Date(item.date).toString() !== "Invalid Date") 
                        && (typeof(item.notes) === "string")   
                    ){
                        
                        const docRef = await this.firebase.doAddTodo(item);
        
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
        
            updateTodoItem = async (item: TodoItemType) => {
                try {
                    await this.firebase.doUpdateTodo(item);
            
                    console.log("Succesfull updated ckecked status of Item.");
                } catch(error){
                    console.error("Failed to update Item.", error);
                }
            }
        
            getTodoItems = async (): Promise<TodoItemType[]> => {
                try {
                    let result = await this.firebase.doGetTodos();
                    console.log("Successfully get data.")
                    return result;
                } catch(error) {
                    console.error("Something went wrong: ", error);
                    return []
                }
            }
        
            deleteTodoItem = async ( 
                item: TodoItemType
                ) => {
                try{
                    await this.firebase.doDeleteTodo(item);
                    console.log("Deleting document succesfull.")
                } catch(error){
                    console.error("Error deleting document: ", error);
                }
            }
}

export default FirestoreController;