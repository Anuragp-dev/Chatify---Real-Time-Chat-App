import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/auth.route.js'
import messageRouter from './routes/message.route.js'

dotenv.config()


const app = express()
const port = process.env.PORT || 5002

app.use(express.json())
app.use(cookieParser())
app.use(cors())



app.use("/api/auth", authRouter)
app.use("/api/message", messageRouter)



app.listen(port, () => {
    console.log('Server is running on port: ' + port);
    connectDB()
})