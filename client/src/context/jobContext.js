import { useEffect, useReducer, createContext, useState } from "react"

const JobContext = createContext()

const initialState = []

const reducer = (state, action) => {
    switch (action.type) {
        case "fetch":
            return action.payload
        case "add":
            return [action.payload, ...state]
        case "patch":
            return state.map(job => job.id === action.payload.id ? 
                            action.payload : job)
        case "remove":
            return state.filter(job => job.id !== action.payload.id)
        default:
            return state;
    }
}

const JobProvider = ({ children }) => {
    const [jobs, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        fetch('/jobs')
        .then(resp => {
            resp.json().then(data => {
                if (resp.ok){
                    dispatch({
                        type:'fetch',
                        payload:data
                    })
                } else {
                    throw new Error('Can not render jobs!')
                }
            })
        }).catch(error => alert(error))
    }, [])

    return (
        <JobContext.Provider value={{ jobs, dispatch }}>
            { children }
        </JobContext.Provider>
    )
}

export { JobContext, JobProvider }