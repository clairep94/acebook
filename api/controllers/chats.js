const Chat = require("../models/chat");
const TokenGenerator = require("../lib/token_generator");

// TODO:
// Add back authentication-only here and in app.js
// Restrict Create -- cannot create if there is already a chat between users
// Restrict Create -- cannot create if not friends? -- import users controller.

const ChatsController = {
    Create: async (req, res) => { // returns the new Chat obj, with members.populate with _id, firstName, lastName, profilePicURL
        const newChat = new Chat({
            members: [req.body.senderID, req.body.receiverID]
        });
        try {
            const result = await newChat.save();
            const token = TokenGenerator.jsonwebtoken(req.user_id) 
            const populatedChat = await Chat.populate(result,{
                path: 'members',
                select: '_id firstName lastName profilePictureURL'
            })
            res.status(201).json({ message: 'Successful New Chat in Chats Controller', token: token, chat: populatedChat }); 
            // res.status(201).json({ message: 'Successful New Chat in Chats Controller', chat: populatedChat });
            
        } catch (error) {
            console.log('Error in Chat Controller - Create:', error);
            res.status(500).json(error);
        }
    },
    UserInbox: async (req, res) => { // returns a list of Chat obj, with members.populate with _id, firstName, lastName, profilePicURL OR []
        const userID = req.params.userID;        
        try {
            const chats = await Chat.find({
                members: { $in: [userID] }
            })
            .populate({
                path: 'members',
                select: '_id firstName lastName profilePictureURL'})
            .populate({
                path: 'lastMessage',
                select: 'body author createdAt read'            
            })
            const token = TokenGenerator.jsonwebtoken(req.user_id); 
            res.status(201).json({ message: 'Successful Inbox In Chats Controller', token, chats: chats }); 
            // res.status(200).json({ message: 'Successful Inbox In Chats Controller', chats: chats });
            
        } catch (error) {
            console.log('Error in Chat Controller - UserInbox:', error);
            res.status(500).json(error);
        }
    },
    FindChat: async (req, res) => { // returns a Chat obj, with members.populate with _id, firstName, lastName, profilePicURL OR null
        const firstUserID = req.params.firstID;
        const secondUserID = req.params.secondID;
                try {
            const chat = await Chat.findOne({
                members: { $all: [firstUserID, secondUserID] } 
            })
            .populate({
                path: 'members',
                select: '_id firstName lastName profilePictureURL'})
            const token = TokenGenerator.jsonwebtoken(req.user_id);
            res.status(201).json({ message: 'Successful Chat Found In Chats Controller', token, chat: chat }); 
            // res.status(200).json({ message: 'Successful Chat Found In Chats Controller', chat: chat });
            
        } catch (error) {
            console.log('Error in Chat Controller - FindChat:', error);
            res.status(500).json(error);
        }
    },


}

module.exports = ChatsController;