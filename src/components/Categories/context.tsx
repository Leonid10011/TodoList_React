import React from "react";
import { CategoryType } from "./types/types";

type CategoryContextType = {
    categories: CategoryType[],
    setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>; 
}

const CategoryContext = React.createContext<CategoryContextType>({
    categories: [],
    setCategories: (categories) => {},
});

export default CategoryContext;