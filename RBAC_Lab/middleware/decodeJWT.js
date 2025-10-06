const jwt = require('jsonwebtoken');

function decode(req, res, next) {
    console.log("decoding JWT");
    console.log(req.cookies);
    let token = '';
    if(req.header('Authorization')) {
        // extracting token from request header, leaving this as it is so that postman will work
        token = req.header('Authorization').replace('Bearer ', ''); // String Bearer has a space.
    } else {
        // Adding logic to extract token from cookies, react frontend will send token from cookies
        console.log(req.cookies.auth_token);
        token = req.cookies.auth_token;
    }

    if(!token) {
        console.error("no token");
        return res.status(401).json({message: "No token, access denied"});
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