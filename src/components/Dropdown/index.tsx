import React, { ChangeEvent, MouseEventHandler } from "react";

import styles from "./styles.module.css";
import { CategoryContext } from "../Categories";
import { FirebaseContext } from "../Firebase";
import FirestoreController from "../../databaseController/controller";

type PopupProps = {
    closePopup: () => void;
}

const Popup = ({closePopup } : PopupProps ) => {
    const [category, setCategrory] = React.useState("");
    const categoriesContext = React.useContext(CategoryContext);
    const firebaseContext = React.useContext(FirebaseContext);
    const fc = new FirestoreController(firebaseContext);

    const handleOnChange = (event: ChangeEvent) => {
        setCategrory((event.target as HTMLInputElement).value)
        console.log(category);
    }

    const handleOnClick = () => {
        const addCategory = async () => {
            let id = await fc.addCategory(category);
            categoriesContext.setCategories(
                [...categoriesContext.categories, Object({
                    id: id,
                    category: category
                })]
            );
        }
        addCategory();

    }

    return(
        <div className={styles.popup}>
            <div className={styles.popup_inner}>
                <div onClick={closePopup} className={styles.close_btn}>Close</div>
                <h1>Enter new Category</h1>
                <input value={category} onChange={handleOnChange}/>
                <div onClick={handleOnClick} className={styles.close_btn}>Add</div>
            </div>
        </div>
    )
}

type DropdownProps = {
    handleChange: (text: string) => void;
}

function Dropdown({handleChange} : DropdownProps ){
    const categories = React.useContext(CategoryContext);
    const [open, setOpen] = React.useState(false);

    const onHandleChange = (event: ChangeEvent) => {
        if((event.target as HTMLSelectElement).value === "new" ){
            console.log("Add new Categroy.");
        }else {
            handleChange((event.target as HTMLSelectElement).value);
        }

    }

    const handleOptionClick = () => {
        setOpen(!open);
    }
    
    const handleOnClick = (event: React.MouseEvent) => {
        let selectedCategory = ((event.target as HTMLButtonElement).previousElementSibling as HTMLSelectElement).selectedOptions[0].value;
        
    }

    React.useEffect(() => {
        // Rerender
        console.log("Rerender Dropdowns.", categories.categories)
    }, [categories.categories]);

    return(
        <>
            <select onChange={onHandleChange}>
                {categories.categories.map((category) => 
                    <option 
                        key={category.id} 
                        value={category.category} 
                        className={styles.option}
                        >{category.category}
                    </option>  )}
                    <hr />
                <option key="999" value="new" onClick={handleOptionClick} className={styles.add_new_category}>NEW</option>
            </select>    
            <button onClick={handleOnClick} >XXX</button>
            {
                open ? 
                <Popup closePopup={handleOptionClick}></Popup> :
                null
            }
        </>
    )
}

export default Dropdown;