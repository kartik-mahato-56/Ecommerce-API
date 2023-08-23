const multer = require("multer");
const path = require('path')
const fs = require('fs')

exports.upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, callback) => {
            // try {
            if (!fs.existsSync(path.join(__dirname, "..", '/uploads'))) {
                fs.mkdirSync(path.join(__dirname, "..", '/uploads'))
            }
            callback(null, 'uploads/')
            // } catch (error) {

            // return callback(null, false)
            // return res.send(500).json({ success: false, message: error.message });
            // }

        },
        filename: (req, file, callback) => {
            let ext = path.extname(file.originalname)
            callback(null, Date.now() + ext);
        }
    }),
    fileFilter: (req, file, callback) => {
        if (file.mimetype === "image/jpg" || file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
            callback(null, true);
        } else {
            callback(new Error('Only JPEG,JPG and PNG files are allowed'), false)
            // return res.send(500).json({ success: false, message: "Only jpeg , jpg and png files are allowed" });
        }
    },
    limits: {
        files: 1024 * 1024 * 2
    }
})
