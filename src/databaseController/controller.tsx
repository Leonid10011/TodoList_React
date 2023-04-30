import React from "react";

import { TodoItemType } from "../components/Todolist/types/types";
import { SetTodoItemType } from "../components/Additem/types/types";
import { CategoryType } from "../components/Categories/types/types";

import Firebase from "../components/Firebase";
/**
 * 
 * @param Firebase Object
 * @description Controller that gets a Firebase Object to execute database(Firestore) operations.
 */
class FirestoreController{
    firebase: Firebase;
        constructor(firebase: Firebase){
            this.firebase = firebase;
        }
        /**
         * 
         * @param item 
         * @returns id of the added object.
         * @description Adds the item to the database and returns its ID
         */
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
        
        /**
         * 
         * @param item 
         * @description 
         */
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
                console.log("Successfully get data.", result)
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

        addCategory = async (
            category: string
            ) => {
                try{
                    await this.firebase.doAddCategory({category: category});
                    console.log("Adding Category Successfull");
                } catch( error ) {
                    console.error("Errer adding Category: ", error);
                }
                
                
            }

        getCategories = async (): Promise<CategoryType[]> => {
            try{
                let result = await this.firebase.doGetCategory();
                console.log("getCategories Result: ", result);
                return result;
            } catch(error) {
                console.error(error);
                return []
            }
        }
    }

export default FirestoreController;