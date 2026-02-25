import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/mongoose.config.js"
import todoRoutes from "./routes/todo.route.js"
import cors from "cors"

dotenv.config({quiet: true})

connectDB()
const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(express.json())

app.use("/api/todo", todoRoutes)

app.listen(process.env.PORT, () => {
    console.log("Server is running on PORT:", process.env.PORT)
}) 