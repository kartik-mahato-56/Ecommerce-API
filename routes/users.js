const express = require('express');
const userController = require('../controllers/userController')
const { authenticate, authenticateAdmin } = require("../middleware/verifyToken")
const router = express.Router();


//all users list routes
router.get('/', authenticateAdmin, userController.allUsers);
//users stats
router.get('/stats', authenticateAdmin, userController.userStats);
//get user
router.get('/:id', authenticate, userController.getUser);
//update user routes
router.put('/:id', authenticate, userController.updateUser);



module.exports = router