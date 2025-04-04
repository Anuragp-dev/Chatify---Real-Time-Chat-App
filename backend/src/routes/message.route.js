import express from 'express'
import { protectRoutes } from '../middleware/auth.middleware.js'
import { getMessages, getUserForSidebar, sendMessage } from '../controllers/message.controller.js'




const router = express.Router()


// get sidebar users
router.get('/users', protectRoutes, getUserForSidebar)
// get the single user chat
router.get('/:id', protectRoutes, getMessages)
// send message
router.post('/send/:id', protectRoutes, sendMessage)




export default router