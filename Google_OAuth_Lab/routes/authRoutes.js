import express from 'express';
import passport from '../oauth_strategies/passport.js';
import { GOOGLE_CALLBACK_URL, JWT_SECRET } from '../const.js';
import jwt from 'jsonwebtoken';


const authRouter = express.Router();


// this route will be used when user select "Signin with google"
authRouter.get('/auth/google', 
    passport.authenticate('google', {scope: ['profile', 'email']}));



authRouter.get(GOOGLE_CALLBACK_URL, 
    passport.authenticate('google',{failureRedirect: '/'}),
    (req, res) => {
        console.log("testing")
        console.log(req.user);
        const token = jwt.sign({
            userid: req.user?.id,
            name: req.user?.name,
            email: req.user?.email,
        }, 
        JWT_SECRET
        );

        // res.status(200).json({message: "Success"});
        res.redirect(`http://localhost:5173/oauth_lab/dashboard?token=${token}&user=${req.user?.name}&email=${req.user?.email}`)
    }
)

export default authRouter;