import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import * as CREDS from "./config";

const firebaseConfig = {

    apiKey: CREDS.default.REACT_APP_API_KEY,
  
    authDomain: CREDS.default.REACT_APP_AUTH_DOMAIN,
  
    projectId: CREDS.default.REACT_APP_PROJECT_ID,
  
    storageBucket: CREDS.default.REACT_APP_STORAGE_BUCKET,
  
    messagingSenderId: CREDS.default.REACT_APP_MESSAGING_SENDER_ID,
  
    appId: CREDS.default.REACT_APP_ID
  
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  export const db = getFirestore(app);