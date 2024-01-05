const Chat = require("../models/chat");
const TokenGenerator = require("../lib/token_generator");

// TODO:
// Add back authentication-only here and in app.js
// Restrict Create -- cannot create if there is already a chat between users
// Restrict Create -- cannot create if not friends? -- import users controller.

const ChatsController = {
    Create: async (req, res) => {
        const newChat = new Chat({
            members: [req.body.senderID, req.body.receiverID]
        });
        try {
            const result = await newChat.save();
            // const token = TokenGenerator.jsonwebtoken(req.user_id) // TODO change back to Auth Only once all testing is done
            await result.populate('members', '-password').execPopulate();
            // res.status(201).json({ message: 'Successful New Chat in Chats Controller', token: token, chat: result }); // TODO change back to Auth Only once all testing is done
            res.status(201).json({ message: 'Successful New Chat in Chats Controller', chat: result });
            
        } catch (error) {
            console.log('Error in Chat Controller - Create:', error);
            res.status(500).json(error);
        }
    },
    UserInbox: async (req, res) => {
        const userID = req.params.userID;        
        try {
            const chats = await Chat.find({
                members: { $in: [userID] }
            })
            .populate('members', '-password') 
            // const token = TokenGenerator.jsonwebtoken(req.user_id); // TODO change back to Auth Only once all testing is done
            // res.status(201).json({ message: 'Successful Inbox In Chats Controller', token, chats: chats }); // TODO change back to Auth Only once all testing is done
            res.status(200).json({ message: 'Successful Inbox In Chats Controller', chats: chats });
            
        } catch (error) {
            console.log('Error in Chat Controller - UserInbox:', error);
            res.status(500).json(error);
        }
    },
    FindChat: async (req, res) => {
        const firstUserID = req.params.firstID;
        const secondUserID = req.params.secondID;
                try {
            const chat = await Chat.findOne({
                members: { $all: [firstUserID, secondUserID] } 
            })
            .populate('members', '-password') 
            const token = TokenGenerator.jsonwebtoken(req.user_id); // TODO change back to Auth Only once all testing is done
            // res.status(201).json({ message: 'Successful Chat Found In Chats Controller', token, chat: chat }); // TODO change back to Auth Only once all testing is done
            res.status(200).json({ message: 'Successful Chat Found In Chats Controller', chat: chat });
            
        } catch (error) {
            console.log('Error in Chat Controller - FindChat:', error);
            res.status(500).json(error);
        }
    },


}

module.exports = ChatsController;