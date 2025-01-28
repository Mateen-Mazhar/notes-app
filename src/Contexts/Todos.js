import React, { createContext, useContext, useState } from 'react'


export const TodosContext = createContext()
 
 
const TodosProvider = ({children}) => {

let [todos, setTodos] = useState([])
  return (
    <TodosContext.Provider value={{todos, setTodos}}>
        {children}
        </TodosContext.Provider>
  )
}
export const useTodosContext = () => useContext(TodosContext)
export default TodosProvider