import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"



// register
export const signup = async (req, res) => {

    const { fullName, email, password } = req.body


    try {

        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" })
        }

        const user = await User.findOne({ email })

        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)


        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        })


        if (newUser) {
            generateToken(newUser._id, res)
            await newUser.save()

            res.status(201).json({

                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic,
            })

        } else {
            return res.status(400).json({ message: "User not created" })
        }




    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}


// login
export const login = async (req, res) => {

    const { email, password } = req.body

    try {

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        generateToken(user._id, res)

        res.status(200).json({

            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic,
        })


    } catch (error) {
        console.log("error in login controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }

}

// logout
export const logout = async (req, res) => {


    try {

        res.cookie("jwt", "", {
            maxAge: 0,
        })

        res.status(200).json({ message: "User logged out" })

    } catch (error) {
        console.log("error in logout controller", error.message)
        res.status(500).json({ message: "Internal server error" })
    }
}