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
app.use(express.json({ limit: '5mb' })); // or even '10mb'
app.use(express.urlencoded({ limit: '5mb', extended: true }));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))



app.use("/api/auth", authRouter)
app.use("/api/message", messageRouter)



app.listen(port, () => {
    console.log('Server is running on port: ' + port);
    connectDB()
})