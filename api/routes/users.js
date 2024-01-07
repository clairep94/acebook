const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");
const User = require("../models/user");
const API_Endpoint = "/users"


router.get("/", UsersController.Index); // Index
router.get("/:userID", UsersController.FindByID); // Find by ID simple
router.get("/full_profile/:userID", UsersController.FindByIDDetailed); //Find by ID full, .populate on friends and requests

// ----- FRIEND FEATURE ------ //
router.put("/:userID/send_request", UsersController.SendFriendRequest);
router.put("/:userID/unsend_request", UsersController.UnsendFriendRequest);
router.put("/:userID/accept_request", UsersController.AcceptFriendRequest);
router.put("/:userID/deny_request", UsersController.DenyFriendRequest);
router.put("/:userID/unfriend", UsersController.UnFriend);


module.exports = router;
