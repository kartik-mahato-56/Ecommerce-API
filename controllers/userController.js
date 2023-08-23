const mongoose = require("mongoose")
const User = require("../models/User")
const CryptoJS = require('crypto-js')


//all users list

exports.allUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");
        if (!users) return res.status(404).json({ success: false, message: "No users found" });
        return res.status(200).json({
            success: true,
            data: users,
            message: "Users lists retrieve successfull"
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        const { password, ...userData } = user._doc;
        return res.status(200).json({
            success: true,
            data: userData,
            message: "User details retrieve successfull"
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}
//updating user details
exports.updateUser = async (req, res, next) => {
    try {
        const userData = req.body;
        //if password is set in request body then encrypt it
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

exports.userStats = async (req, res, next) => {
    try {
        const date = new Date();
        const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ])
        return res.status(200).json({
            success: true,
            data: data,
            message: "user details fetach successfully"
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message })
    }
}