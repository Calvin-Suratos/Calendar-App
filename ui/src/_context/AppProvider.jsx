import React, { createContext } from 'react'

const GlobalContext = createContext()

const AppProvider = ({ children }) => {


  const store = {

    /* STATES */

    /* SETTERS */
    
    /* EFFECTS */

    /* REFS */

  }


  return (
    <GlobalContext.Provider value={{ store }}>
      { children }
    </GlobalContext.Provider>
  )
}

export { GlobalContext, AppProvider };