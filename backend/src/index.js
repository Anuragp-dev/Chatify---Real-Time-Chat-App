import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './lib/db.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/auth.route.js'
import messageRouter from './routes/message.route.js'
import { app, server } from './lib/socket.js'
import path from "path";

dotenv.config()


const port = process.env.PORT || 5002
const __dirname = path.resolve();

app.use(express.json())
app.use(cookieParser())
app.use(express.json({ limit: '5mb' })); // or even '10mb'
app.use(express.urlencoded({ limit: '5mb', extended: true }));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))



app.use("/api/auth", authRouter)
app.use("/api/messages", messageRouter)

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}


server.listen(port, () => {
    console.log('Server is running on port: ' + port);
    connectDB()
})