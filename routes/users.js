const express = require('express');
const userController = require('../controllers/userController')
const {authenticate} = require("../middleware/verifyToken")
const router = express.Router();



//update user routes
router.put('/:id', authenticate, userController.updateUser);

module.exports = router