const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

const decodeTokenMiddleware = (req, res, next) => {
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Authentication token is missing' });
    }

    jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        req.body.storeid = decodedToken.id;
        next();
    });
};

module.exports = decodeTokenMiddleware;