const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    console.log(req.headers.authorization.split(' ')[1])
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, `${process.env.TOKEN_ENCODED}`);
        
        const userId = decodedToken.userId;
        const Type = decodedToken.Type;
        req.auth = {
            userId: userId,
            userType: Type
        };
    next();
    } catch (error) {
            res.status(403).json({ error})
    }
};