import React from 'react'
import { useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, updateTodo } from './redux/todoSlice'

export default function App() {
    const [input, setInput] = useState("")
    const {todos} = useSelector((state) => state.todo)
    const dispatch = useDispatch()
  
    async function handleSubmit(e){
        e.preventDefault()
        const todo = {id: uuidv4(),  title: input, isCompleted: false}
        dispatch(addTodo({todo}))
        setInput("")
    }
    console.log(todos)

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
                <button type='submit'>Add</button>
            </form>
            <div>
                {todos.map((todo) => (
                    <div key={todo.id}>
                        <input type="checkbox" onChange={() => dispatch(updateTodo({id: todo.id}))} checked={todo.isCompleted}/>
                        <label>{todo.title}</label>
                        <button onClick={() => dispatch(deleteTodo({id: todo.id}))}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
