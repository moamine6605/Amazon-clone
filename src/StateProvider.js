import React, {createContext, useContext, useReducer} from "react";


export const StateContext = createContext()


export function StatePovider({reducer, initialState, children}) {
    return (
        <StateContext.Provider value={useReducer(reducer, initialState)}>
            {children}
        </StateContext.Provider>
    )

};

export const useStateValue = () => useContext(StateContext);