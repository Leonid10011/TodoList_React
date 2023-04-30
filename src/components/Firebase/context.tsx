import React from "react";
import Firebase from "./firebase";

const FirebaseContext = React.createContext<Firebase>(new Firebase);

type withFirebaseProps = {
    
}
// creat a HOC for simplicity
function withFirebase<T extends withFirebaseProps>(
    Component: React.FC<T>
){
    return(props: T) =>{
        return(
            <FirebaseContext.Consumer>
                { firebase => <Component {...props} firebase={firebase} />}
            </FirebaseContext.Consumer>
        )
    }
}

export default FirebaseContext;

export { withFirebase }