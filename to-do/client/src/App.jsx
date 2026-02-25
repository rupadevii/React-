import React from 'react'
import { useState } from 'react'

export default function App() {
    const [input, setInput] = useState("")
    const [todos, setTodos] = useState([])

    async function handleSubmit(e){
        e.preventDefault()

        try {
            const res = await fetch("http://localhost:5000/api/todo/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name: input, isCompleted: false})
            })
            const data = await res.json()
            console.log(data)
            setTodos(prev => ([...prev, {id: data.newTodo._id, todo: input, isCompleted: false}]))
            setInput("")
        } catch (error) {
            console.error(error)
        }
    }
    console.log(todos)

    function handleChange(id){
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={input} onChange={(e) => setInput(e.target.value)}/>
                <button type='submit'>Add</button>
            </form>
            <div>
                {todos.map((todo, index) => (
                    <div key={todo.id}>
                        <input type="checkbox" onChange={() => handleChange(index)} checked={checboxes[index]}/>
                        <label>{todo.todo}</label>
                    </div>
                ))}
            </div>
        </div>
    )
}
