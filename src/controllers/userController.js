const mongoose = require("mongoose")
const User = require("../models/User")
const CryptoJS = require('crypto-js')

//updating user details
exports.updateUser = async (req, res, next) => {
    try {
        const userData = req.body;
        if (userData.password) {
            userData.password = CryptoJS.AES.encrypt(userData.password, process.env.PASS_SECRET).toString()
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: userData }, { new: true });
        return res.status(200).json({
            success: true,
            data: updatedUser,
            message: "Successfully updated user data"
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }

}