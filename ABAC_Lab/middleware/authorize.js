// import UserModel from "../models/UserModel";

export const authorizeUser = (allowedDepartments = []) => {
    return (req, res, next) => {
        const userDept = req.user.department;
        if(!userDept) {
            return res.status(401).json({
                message: 'Not Authorized'
            })
        }
        if(allowedDepartments.includes(userDept)) {
            console.log('user is authorized');
            next();
        } else {
            res.status(401).json({
                message: 'Not Authorized',
            })
        }
    }
}