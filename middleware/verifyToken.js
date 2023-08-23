const dotenv = require('dotenv');
const jwt = require('jsonwebtoken')
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY;

//verifying the jwt token
exports.verifyToken = async (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({
            success: false,
            message: 'You are not authenticated'
        })
    }
    try {
        const token = authorization.split('Bearer ')[1];
        if (!token) {
            return res.status(401).json({
                message: 'Invalid Token Format'
            });
        }
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) return res.status(403).json({ success: false, message: "Token is not valid!" });
            req.user = user;

            next();
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal server Error',
            error: error.message,
        });
    }
}

//authenticating the user
exports.authenticate = (req, res, next) => {
    this.verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ success: false, message: "You are not authorized" })
        }
    })
}

exports.authenticateAdmin = (req, res, next) => {
    this.verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next();
        } else {
            return res.status(403).json({ success: false, message: "You are not authorized" })
        }
    })
}
// const jwt = require('jsonwebtoken');
// const SECRET_KEY = process.env.SECRET_KEY;

// function VerifyToken(req, res, next) {
//     const authorization = req.headers.authorization;
//     if (!authorization) {
//         return res.status(401).json({
//             message: 'No Authorization Header'
//         })
//     }
//     try {
//         const token = authorization.split('Bearer ')[1];
//         if (!token) {
//             return res.status(401).json({
//                 message: 'Invalid Token Format'
//             })
//         }
//         const decode = jwt.verify(token, SECRET_KEY);
//         req.user = decode
//         next()
//     } catch (error) {
//         if (error instanceof jwt.TokenExpiredError) {
//             return res.status(401).json({
//                 message: 'Session Expired',
//                 error: error.message,
//             })
//         }
//         if (error instanceof jwt.JsonWebTokenError || error instanceof TokenError) {
//             return res.status(401).json({
//                 message: 'Invalid Token',
//                 error: error.message,
//             })
//         }
//         res.status(500).json({
//             message: 'Internal server Error',
//             error: error.message,
//             stack: error.stack
//         });
//     }
// }

// module.exports = VerifyToken