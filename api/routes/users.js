const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");
const API_Endpoint = "/users"


router.get("/", UsersController.Index); // Index
router.get("/:userID", UsersController.FindByID); // Find by ID



module.exports = router;
