const authorizeRequest = (roles= []) => {
    return (req, res, next) => {
        console.log("Autorizing request");
        if(roles.includes(req.user.role)) {
            next();
        } else {
            res.status(401).json({message:"Not Authorized. Access denied"});
        }
    }
}

module.exports = authorizeRequest;