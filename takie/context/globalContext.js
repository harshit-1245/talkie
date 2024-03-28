import React, { createContext } from "react"

export const GlobalContext = createContext(null)

export const GlobalContextProvider = ({ children }) => {
    return (
        <GlobalContext.Provider value={{}}>
            {children}
        </GlobalContext.Provider>
    );
}
