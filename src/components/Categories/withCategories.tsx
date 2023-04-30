import React from "react";

import CategoryContext from "./context";

type CategoriesProps = {
    categories: string[],
}

function withCategories<T extends CategoriesProps>(
    Component: React.FC<T>
){
    return (props: T) => {
        const [categories, setCategories] = React.useState<string[]>(new Array);

        React.useEffect(() => {
            console.log("Initialize Category Context")
        }, []);

        return(
            <CategoryContext.Provider value={categories}>
                <Component {...props}/>
            </CategoryContext.Provider>
        )
    }
}

export default withCategories;