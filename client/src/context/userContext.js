import { useEffect, useReducer, createContext, useState } from "react"

const UserContext = createContext()

const initialState = []

const reducer = (state, action) => {
    switch (action.type) {
        case "fetch":
            return action.payload
        case "add":
            return [action.payload, ...state]
        case "patch":
            return state.map(user => user.id === action.payload.id ? 
                            action.payload : user)
        case "remove":
            return state.filter(user => user.id !== action.payload.id)
        default:
            return state;
    }
}

const UserProvider = ({ children }) => {
    const [users, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        fetch('/users')
        .then(resp => {
            resp.json().then(data => {
                if (resp.ok){
                    dispatch({
                        type:'fetch',
                        payload:data
                    })
                } else {
                    throw new Error('Can not render users!')
                }
            })
        }).catch(error => alert(error))
    }, [])

    return (
        <UserContext.Provider value={{ users, dispatch }}>
            { children }
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }