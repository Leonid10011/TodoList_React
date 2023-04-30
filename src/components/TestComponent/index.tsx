import React from "react";

import { CategoryContext } from "../Categories";

import FirebaseContext, { withFirebase } from "../Firebase/context";
import Firebase from "../Firebase";

function TestComponent (props: { name: string}) {
    const fire = React.useContext(FirebaseContext);
    console.log("ets", fire, "\nte: ", props.name);
    
    return(
        <>
            <p>I have acces to firebase too! </p>
        </>
    )
}

export default withFirebase(TestComponent);