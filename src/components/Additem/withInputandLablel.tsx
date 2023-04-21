import React from "react";

import { InputWithLabelProps } from "./types/types";

import styles from "./styles/index.module.css";

function withInputandLabel<T extends InputWithLabelProps>(
    Component: React.FC<T>
    ){
    return (props:  T) => {
        React.useEffect(() => {
            if(props.name === "Date")
            props.dispatchItem({
                    type: "SET_DATE",
                    payload: (new Date()).toDateString(),
                });
        }, [])
    
        return(
            <div className={styles.inputWithLabel} id={styles.sidebar}>
                <label htmlFor={props.id} className={styles.itemLabel}>{props.name}</label>
                <Component {...props}/>
            </div>
        )
    }
} 

export { withInputandLabel };