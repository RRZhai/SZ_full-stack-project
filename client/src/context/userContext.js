import { useEffect, useReducer, createContext, useState } from "react"

const EmployeeContext = createContext()

const initialState = []

const reducer = (state, action) => {
    switch (action.type) {
        case "fetch":
            return action.payload
        case "add":
            return [action.payload, ...state]
        case "patch":
            return state.map(employee => employee.id === action.payload.id ? 
                            action.payload : employee)
        case "remove":
            return state.filter(employee => employee.id !== action.payload.id)
        default:
            return state;
    }
}

const EmployeeProvider = ({ children }) => {
    const [employee, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        fetch('/user/')
        .then(resp => {
            resp.json().then(data => {
                if (resp.ok){
                    dispatch({
                        type:'fetch',
                        payload:data
                    })
                } else {
                    throw new Error('Can not render reviews!')
                }
            })
        }).catch(error => alert(error))
    }, [])

    return (
        <ReviewContext.Provider value={{ reviews, dispatch }}>
            { children }
        </ReviewContext.Provider>
    )
}

export { ReviewContext, ReviewProvider }