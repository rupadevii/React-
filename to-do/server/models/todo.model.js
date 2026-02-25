import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean
    }
})

const Todo = mongoose.model("Todo", todoSchema)

export default Todo;