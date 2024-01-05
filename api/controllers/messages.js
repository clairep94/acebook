const Message = require("../models/message");
// const TokenGenerator = require("../lib/token_generator");

const MessagesController = {
    AddMessage: async (req, res) => { // returns a chat doc with author.populate
        const newMessage = new Message({
            chatID: req.body.chatID,
            author: req.body.authorID,
            body: req.body.body
        });
        try {
            const result = await newMessage.save()

            // Populate the 'author' field with user data
            const populatedMessage = await Message.populate(result, {
                path: 'author',
                select: '-password', // Exclude password field from populated user
            });
            // const token = TokenGenerator.jsonwebtoken(req.user_id) 
            // res.status(201).json({ message: 'Successful New Message in Messages Controller', token:token, newMessage: populatedMessage, });
            res.status(201).json({ message: 'Successful New Message in Messages Controller', newMessage: result });

        } catch (error) {
            console.log('Error in Message Controller - AddMessage:', error);
            res.status(500).json(error);
        }
    },
    GetMessages: async (req, res) => { // Returns array of Chat docs, with author.populate OR []
        const chatID = req.params.chatID;
        try {
            const messages = await Message.find(
                { chatID: chatID },
            )
            .populate('author', '-password')
            // const token = TokenGenerator.jsonwebtoken(req.user_id) 
            // res.status(200).json({ message: 'Successful All Messages in Messages Controller', allMessages: messages, token: token }); 
            res.status(200).json({ message: 'Successful All Messages in Messages Controller', allMessages: messages }); 

        } catch (error) {
            console.log('Error in Message Controller - GetMessages:', error);
            res.status(500).json(error);
        }
    },
    // MarkAsRead: async (req, res) => {
    //     const messageID = req.params.messageID;
    //     try {

    //     }
    // }

}

module.exports = MessagesController