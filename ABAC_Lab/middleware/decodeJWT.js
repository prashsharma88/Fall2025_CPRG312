const jwt = require('jsonwebtoken');

function decode(req, res, next) {
    console.log('decoding JWT');
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if(!token) {
        console.log('No token');
        return res.status(401).json({
            message: "Invalid Token",
        })
    }

    try {
        const result = jwt.decode(token, process.env.JWT_SECRET);
        req.user = result;
        next();
    } catch(err) {
        console.error("error while decoding jwt");
        console.error(err);
        return res.status(500).json({
            message:  'internal server error',
        })
    }
}

module.exports = decode;