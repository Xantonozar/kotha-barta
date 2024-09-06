const asyncHandler = require('express-async-handler');
const Message = require('../Models/MessageModel');
const Chat = require('../Models/ChatModel');
const User = require('../Models/UserModel');
const sendMessage = asyncHandler(
    async (req, res) => {
        const { content, chatID } = req.body;
        console.log(content, chatID);
        
        if (!content || !chatID) {
            console.log("Invalid data passed into request");
            return res.sendStatus(400);
        }
        var newMessage = {
            sender: req.user._id,
            content: content,
            chat: chatID,
        };
        try {
            var message = await Message.create(newMessage);
            message = await message.populate("sender", "name pic");
            message = await message.populate("chat");
            message = await User.populate(message, {
                path: "chat.users",
                select: "name pic email",
            });
            await Chat.findByIdAndUpdate(req.body.chatID, {
                latestMessage: message,
            });
            res.json(message);
        } catch (error) {
            console.log(error);
            
            res.status(400);
            throw new Error(error.message);
        }
    }
);
const allMessages = asyncHandler(
    async (req, res) => {
        try {
            const messages = await Message.find({ chat: req.params.chatID })
                .populate("sender", "name pic email")
                .populate("chat");
            res.json(messages);
        } catch (error) {
            res.status(400);
            throw new Error(error.message);
        }
    }
);

module.exports = { sendMessage , allMessages };