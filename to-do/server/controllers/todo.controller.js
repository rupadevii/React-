import Todo from "../models/todo.model.js";

export const getTodos = async (req, res) => {
    try{
        const todos = await Todo.find({})

        return res.status(200).json({msg: "Todos", todos})
    }
    catch(error){
        return res.status(400).json({msg: error.message})
    }
}

export const addTodo = async (req, res) => {
    try{
        const {name, isCompleted} = req.body;
    
        if(!name){
            return res.status(400).json({msg: "Todo is required"})
        }
    
        const newTodo = await Todo.create({
            name,
            isCompleted : isCompleted || false
        })

        return res.status(201).json({msg: "Todo added successfully", newTodo})
    }
    catch(error){
        return res.status(400).json({msg: error.message})
    }
}

export const updateTodo = async (req, res) => {
    try{
        const {id} = req.params;
        const todo = await Todo.findById(id)
        todo.isCompleted = !todo.isCompleted
        await todo.save()
            
        return res.status(200).json({msg: "Todo updated successfully"})
    }
    catch(error){
        return res.status(400).json({msg: error.message})
    }

}

export const deleteTodo = async (req, res) => {
    try{
        const {id} = req.params;
    
        const todo = await Todo.findOneAndDelete({_id: id});
    
        return res.status(200).json({msg: "Todo deleted successfully", todo})
    }
    catch(error){
        return res.status(400).json({msg: error.message})
    }
}