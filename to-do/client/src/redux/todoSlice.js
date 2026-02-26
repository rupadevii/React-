import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const URL = import.meta.env.VITE_API_URL

const initialState = {
    todos: [],
    loading: false,
    error: null
}

export const fetchTodos = createAsyncThunk (
    'todos/fetchTodos',
    async () => {
        const res = await fetch(`${URL}/`)
        const data = await res.json()
        return data.todos
    }
)

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload.todo)
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter(item => item._id !== action.payload.id)
        },
        updateTodo :(state, action) => {
            const todo = state.todos.find(item => item._id === action.payload.id)
            todo.isCompleted = !todo.isCompleted
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(fetchTodos.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload
                state.loading = false
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
    }
})

export const {addTodo, deleteTodo, updateTodo} = todoSlice.actions

export default todoSlice.reducer