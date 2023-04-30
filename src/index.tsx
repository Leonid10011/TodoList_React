import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import Firebase, { FirebaseContext } from "./components/Firebase";
import { CategoryContext } from "./components/Categories";

const app = createRoot(document.getElementById("app") as HTMLElement);

app.render(
    <FirebaseContext.Provider value={new Firebase()}>
            <App />
    </FirebaseContext.Provider>
);

