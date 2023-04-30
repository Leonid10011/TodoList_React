import React from "react";

import "firebase/auth";
import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { addDoc, getDocs, collection, deleteDoc, doc, updateDoc, getFirestore, Firestore, CollectionReference, DocumentData, DocumentReference } from "firebase/firestore";

import { TodoItemType } from "../Todolist/types/types";
import { SetTodoItemType } from "../Additem/types/types";
import { CategoryType } from "../Categories/types/types";

import * as CREDS from "../../../config";

const firebaseConfig = {

    apiKey: CREDS.default.REACT_APP_API_KEY,
  
    authDomain: CREDS.default.REACT_APP_AUTH_DOMAIN,
  
    projectId: CREDS.default.REACT_APP_PROJECT_ID,
  
    storageBucket: CREDS.default.REACT_APP_STORAGE_BUCKET,
  
    messagingSenderId: CREDS.default.REACT_APP_MESSAGING_SENDER_ID,
  
    appId: CREDS.default.REACT_APP_ID
  
  };

  class Firebase {
    app: firebase.FirebaseApp;
    db: Firestore;

    constructor() {
      this.app = initializeApp(firebaseConfig);
      this.db = getFirestore(this.app);
    }

    doAddTodo = async (
      item: SetTodoItemType
      ) : Promise<DocumentReference<DocumentData>> => 
      await addDoc(collection(this.db, "TodoItems"), item);


    doUpdateTodo = async(
      item: TodoItemType
      ) => {
      const todoRef = doc(this.db, "TodoItems", item.id);
        await updateDoc(todoRef, {
            checked: item.checked
        });
    }
    
    doGetTodos = async() : Promise<TodoItemType[]> => {

      const querySnapshot = await getDocs(collection(this.db, "TodoItems"));
        let result: TodoItemType[] = querySnapshot.docs.map(
            doc => Object({
                id: doc.id,
                ...doc.data()
            })
        );
        return result;
    }

    doDeleteTodo = async(
      item: TodoItemType
    ) => {
      await deleteDoc(doc(this.db, "TodoItems", item.id));
    }
    
    doAddCategory = async (
      category: { category: string } 
    ) : Promise<DocumentReference<DocumentData>> => await addDoc(collection(this.db, "Categories"), category);
    
    
    // : Promise<getCategoriesType>
    doGetCategory = async() : Promise<CategoryType[]> => {
      const querySnapshot =  await getDocs(collection(this.db, "Categories"));

      let result: CategoryType[] = querySnapshot.docs.map(
        doc => Object({
            id: doc.id,
            ...doc.data()
        })
      );

      console.log(result);
      return result;
    }
    /**
     * TODO
    doDeleteCategory = async = (
      category:
    )
     */
  
  }

export default Firebase;