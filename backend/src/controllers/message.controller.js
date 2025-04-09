import User from "../models/user.model.js";
import Message from "../models/message.model.js"
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId } from "../lib/socket.js";

// get user for sidebar
export const getUserForSidebar = async (req, res) => {

    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ id: { $ne: loggedInUserId } }).select("-password")
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("error in getUserForSidebar:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}

// get messages
export const getMessages = async (req, res) => {

    try {
        const { id: userToChatId } = req.params
        const myId = req.user._id

        const messages = await Message.find({
            $or: [
                {
                    senderId: myId, receiverId: userToChatId
                },
                { senderId: userToChatId, receiverId: myId }
            ]
        })


        res.status(200).json(messages)
    } catch (error) {
        console.log("error in getMessages:", error)
        res.status(500).json({ message: "Internal server error" })
    }

}

// send message
export const sendMessage = async (req, res) => {

    try {
        const { text, image } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let imageUrl;

        //upload the image to the cloudinary
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image)
            imageUrl = uploadResponse.secure_url
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        await newMessage.save()

        // realtime function socket io
        const receiverSocketId = getReceiverSocketId(receiverId)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage)
        }

        res.status(200).json(newMessage)
    } catch (error) {
        console.log("error in sendMessage:", error)
        res.status(500).json({ message: "Internal server error" })
    }
}