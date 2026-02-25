import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos : [
        {id: 1, title: "Study", isCompleted: true},
        {id: 2, title: "Code", isCompleted: false},
        {id: 3, title: "Sleep", isCompleted: false},
        {id: 4, title: "Walk", isCompleted: true}
    ]
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload.todo)
        },
        updateTodo: (state, action) => {
            const todo = state.todos.find(item => item.id===action.payload.id);
            todo.isCompleted = !todo.isCompleted
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(item => item.id !== action.payload.id)
        }
    }
    
})

export const {addTodo, updateTodo, deleteTodo} = todoSlice.actions

export default todoSlice.reducer