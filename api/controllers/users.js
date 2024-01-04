const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const UsersController = {
  
  // ======= CREATE NEW USER -- NO AUTHENTICATION, USE "/signup" ===========
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        res.status(400).json({message: 'Bad request'})
      } else {
        res.status(201).json({ message: 'OK' });
      }
    });
  },

  // ======== ALL USERS =====================================
  Index: (req, res) => {
    User.find()
    .exec((err, users) => {
      if (err) {
        throw err;
      }
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({users: users, token: token, message: "UsersController.Index successful"})
    })
  },

  // ======== FIND BY ID ====================================
  // Takes from params: users/:id
  FindByID: async (req, res) => {
    const userID = req.params.userID;
    
    try {
      const user = await User.findOne( //changed from find so that it is not an array
        {_id: userID},
      )
      //TODO .populate? or aggregate? figure out asap.
      // .populate('user_id', '-password')
      // .populate('friends', '-password')
      // .populate('requests', '-password')

      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(200).json({user: user, token: token, message: "UsersController.FindByID successful"})

    } catch (error) {
      console.log("UsersController.FindByID", error);
      res.status(400).json(error);
    }
  },

  // ======== UPDATE PROFILE ================================

  // ======== SEARCH BY NAME ================================
  // Takes from params: users/search/:string


  // ======== FRIENDS FEATURE ================================
  // TODO need to add .populate to each of these, or figure out another way to update.

  // -------- FRIEND REQUEST - SEND/UNSEND --------------------
  // checking if a friend request has already been sent happens in the frontend, rather than the backend (vs with Likes in the backend)
  SendFriendRequest: async (req, res) => {
    try {
      const sessionUser = req.user_id;
      const targetUser = req.params.userID;
      const updatedUser = await User.findOneAndUpdate(
        {_id: targetUser},
        { $push: { requests: sessionUser } },
        { new: true }
      );
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ message: 'Successful Friend Request Send in User Controllers', token: token, user: updatedUser });
  
    } catch (error) {
      console.log('UsersController.SendFriendRequest:', error);
      res.status(400).json(error);
    }
  },

  UnsendFriendRequest: async (req, res) => {
    try {
      const sessionUser = req.user_id;
      const targetUser = req.params.userID;
      const updatedUser = await User.findOneAndUpdate(
        {_id: targetUser},
        { $pull: { requests: sessionUser } },
        { new: true }
      );
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ message: 'Successful Friend Request Unsend in User Controllers', token: token, user: updatedUser });

    } catch (error) {
      console.log('Error in User Controllers - Friend Request:', error);
      res.status(400).json(error);
    }
  },

  // -------- FRIEND REQUEST - CONFIRM/DENY -------------------
  AcceptFriendRequest: async (req, res) => {
    // add targetUser to sessionUser's friends list
    // add sessionUser to targetUser's friends list
    // delete targetUser from sessionUser's requests list.
    try {
      const sessionUser = req.user_id;
      const targetUser = req.params.userID;

      // add targetUser to sessionUser's friends list & delete targetUser from sessionUser's requests list
      const updatedSessionUser = await User.findOneAndUpdate(
        {_id: sessionUser},
        { $push: { friends: targetUser },
          $pull: { requests: targetUser }
        },
        { new: true }
      );
      
      // add sessionUser to targetUser's friends list
      const updatedUser = await User.findOneAndUpdate(
        {_id: targetUser},
        { $push: { friends: sessionUser} },
        { new: true }
      )

      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ message: 'Successful Friend Added in User Controllers', token: token, user: updatedUser });
  
    } catch (error) {
      console.log('Error in User Controllers - Friend Confirm:', error);
      res.status(400).json(error);
    }
  },

  DenyFriendRequest: async (req, res) => {
    // delete targetUser from sessionUser's requests list.
    try {
      const sessionUser = req.user_id;
      const targetUser = req.params.userID;
      const updatedSessionUser = await User.findOneAndUpdate(
        {_id: sessionUser},
        { $pull: { requests: targetUser } },
        { new: true }
      );
      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ message: 'Successful Friend Request Deleted in User Controllers', token, user: updatedSessionUser });

    } catch (error) {
      console.log('Error in User Controllers - Friend Deny:', error);
      res.status(400).json();
    }
  },


  // -------- UNFRIEND ----------------------------------------
  UnFriend: async (req, res) => {
    // delete targetUser from sessionUser's friends list
    // delete sessionUser from targetUser's friends list
    try {
      const sessionUser = req.user_id;
      const targetUser = req.params.userID;

      // delete sessionUser from targetUser's friends list
      const updatedSessionUser = await User.findOneAndUpdate(
        {_id: sessionUser},
        { $pull: { friends: targetUser } },
        { new: true }
      );
      
      // delete sessionUser from targetUser's friends list
      const updatedUser = await User.findOneAndUpdate(
        {_id: targetUser},
        { $pull: { friends: sessionUser } },
        { new: true }
      );

      const token = TokenGenerator.jsonwebtoken(req.user_id);
      res.status(200).json({ message: 'Successful Friend Deleted in User Controllers', token, user: updatedUser });

    } catch (error) {
      console.log('Error in User Controllers - Friend Delete:', error);
      res.status(400).json(error);
    }
  },



};

module.exports = UsersController;
