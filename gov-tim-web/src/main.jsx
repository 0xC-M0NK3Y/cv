import React from "react"
import ReactDOM from "react-dom/client"
import App from "./Routing"
import { startReactDsfr } from "@codegouvfr/react-dsfr/spa"
import { Link } from "react-router-dom"

startReactDsfr({ defaultColorScheme: "system",
                 Link
               })

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
