import jwt from 'jsonwebtoken'
import User from '../models/user.model.js';



export const protectRoutes = async (req, res, next) => {

    try {

        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ message: "Not authorized to access" })
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET);

        if (!decode) {
            return res.status(401).json({ message: "Invalid token" })
        }

        const user = await User.findById(decode.userId).select('-password');

        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }

        req.user = user;

        next();

    } catch (error) {

        console.log("error in protectRoutes middleware", error.message)
        res.status(500).json({ message: "Internal server error" })
    }

}