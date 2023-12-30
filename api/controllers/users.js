const User = require("../models/user");
const TokenGenerator = require("../lib/token_generator");

const UsersController = {
  
  // ======= CREATE NEW USER -- NO AUTHENTICATION, USE "/signup" ===========
  Create: (req, res) => {
    const user = new User(req.body);
    user.save((err) => {
      if (err) {
        // TODO: add errors for duplicate account
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
      const user = await User.find(
        {_id: userID},
      )
      //TODO .populate... 
      const token = TokenGenerator.jsonwebtoken(req.user_id)
      res.status(201).json({user: user, token: token, message: "UsersController.FindByID successful"})

    } catch (error) {
      console.log("UsersController.FindByID", error);
      res.status(500).json(error);
    }
  },

  // ======== UPDATE PROFILE ================================

  // ======== SEARCH BY NAME ================================
  // Takes from params: users/search/:string


  // ======== FRIENDS FEATURE ================================
  // -------- FRIEND REQUEST - SEND/UNSEND --------------------
  // -------- FRIEND REQUEST - CONFIRM/DENY -------------------
  // -------- UNFRIEND ----------------------------------------



};

module.exports = UsersController;
