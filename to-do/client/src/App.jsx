import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateTodo, deleteTodo, addTodo, fetchTodos } from './redux/todoSlice'
const URL = import.meta.env.VITE_API_URL

export default function App() {
    const [input, setInput] = useState("")
    const {todos, loading, error} = useSelector((state) => state.todo)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodos())
    }, [])

    async function handleSubmit(e){
        e.preventDefault()
        if(input.trim() === "") return
        let todo = {name: input, isCompleted: false}
        try{
            const res = await fetch(`${URL}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(todo)
                }
            )
            const data = await res.json()
            
            todo = {...todo, _id:data.newTodo._id}
            dispatch(addTodo({todo}))
            
        }
        catch(error){
            console.error(error)
        }
        setInput("")
    }

    async function removeTodo(index){
        try{
            const res = await fetch(`${URL}/${index}`, {
                method: "DELETE",
                }
            )
            const data = await res.json()
            console.log(data)
            dispatch(deleteTodo({id: index}))
            
        }
        catch(error){
            console.error(error)
        }
    }

    async function updateTodoz(index){
        try{
            const res = await fetch(`${URL}/${index}`, {
                method: "PUT",
                }
            )
            const data = await res.json()
            console.log(data)
            dispatch(updateTodo({id: index}))
            
        }
        catch(error){
            console.error(error)
        }
    }

    if(loading){
        return <div>Loading...</div>
    }

    if(error){
        return <div>Something went wrong...</div>
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
                <button type='submit'>Add</button>
            </form>
            <div>

                {todos.map((todo) => (
                    <div key={todo._id}>
                        <input type="checkbox" onChange={() => updateTodoz(todo._id)} checked={todo.isCompleted}/>
                        <label>{todo.name}</label>
                        <button onClick={() => removeTodo(todo._id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}
