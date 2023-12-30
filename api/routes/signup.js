const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/users");
const API_Endpoint = "/signup"

router.post("/", UsersController.Create);

module.exports = router;
