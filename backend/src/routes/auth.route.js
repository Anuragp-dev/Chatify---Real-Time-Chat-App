import express from 'express'
import { checkAuth, login, logout, signup, updateProfilePic } from '../controllers/auth.controller.js'
import { protectRoutes } from '../middleware/auth.middleware.js'



const router = express.Router()

// register routes
router.post('/signup', signup)
// login routes
router.post('/login', login)
// logout
router.post('/logout', logout)


// update user profile pic
router.put('/updateProfilePic', protectRoutes, updateProfilePic)

// check the autheticated user
router.get('/check', protectRoutes, checkAuth)




export default router