import React, { createContext, useState } from "react"


export const Context = createContext({
    adminValue: false,
    setAdmin: () => {},
})

export const ContextProvider = ({ children }) => {
    const [admin, setAdmin] = useState(false);
    return (
        <Context.Provider value={{ adminValue: admin, setAdmin: setAdmin }}>
            {children}
        </Context.Provider>
    )
}

