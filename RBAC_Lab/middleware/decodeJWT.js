const jwt = require('jsonwebtoken');

function decode(req, res, next) {
    console.log("decoding JWT");
    const token = req.header('Authorization').replace('Bearer ', ''); // String Bearer has a space.
    if(!token) {
        return res.staus(401).json({message: "No token, access denied"});
    }

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedUser;
        console.log(decodedUser);
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({message: "Token is not valid, access denied"});
    }
}

module.exports = decode;