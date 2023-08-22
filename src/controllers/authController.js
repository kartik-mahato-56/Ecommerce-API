const User = require('../models/User')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET_KEY;


exports.register = async (req, res) => {
    const userData = req.body;
    const newUser = new User({
        username: userData.username,
        name: userData.name,
        email: userData.email,
        //hashing the password using crypto-js
        password: CryptoJS.AES.encrypt(userData.password, process.env.PASS_SECRET).toString(),
    });

    try {
        //saving user data to the db
        const user = await newUser.save();
        res.status(201).json({
            "success": true,
            "data": user,
            "message": "Registration successfull"
        });
    } catch (err) {
        res.status(500).json({
            "success": false,
            "message": err
        });
    }
}

exports.login = async (req, res, next) => {
    try {
        const userData = req.body;

        const user = await User.findOne({ username: userData.username });

        // console.log(user);
        //if user not found then send error
        if (!user) {
            return res.status(401).json({
                "success": false,
                "message": "Invalide username or password"
            })

        }
        const hashedPwd = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET);
        const pwd = hashedPwd.toString(CryptoJS.enc.Utf8);

        if (pwd !== userData.password) {

            return res.status(401).json({
                "success": false,
                "message": "Invalide username or password"
            });
        }
        const { password, ...others } = user._doc;
        const accessToken = jwt.sign(
            { id: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET_KEY,
            { expiresIn: "3d" }
        )

        //returning logged user data
        return res.status(200).json({
            "sucess": true,
            "data": {...others,accessToken},
            "message": "Login Successfull"
        });
    } catch (error) {
        res.json({ "success": false, "message": error });
    }


}