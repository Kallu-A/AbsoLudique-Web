import React, { useState } from 'react';

const Context = React.createContext({
  admin: false,
  setAdmin : () => null,
})

const contextProvider = ({ children }) => {
  const [admin, setAdmin] = useState(false);

  return <Context.Provider value={{ admin, setAdmin }}>{children}</Context.Provider>
}

export {Context, contextProvider };