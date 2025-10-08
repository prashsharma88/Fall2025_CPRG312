const express = require('express');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');


const authRouter = express.Router();

authRouter.post('/register', async(req, res) => {
    try {
        const {username, password, name, role, department} = req.body;
        if(!username || !password || !role || !department) {
            console.log("Invalid request body");
            res.status(400).json({
                message: 'Bad Request',
            })
        }
        
        console.log(`${username}: ${role}: ${department}`);
        // generate hashed password
        const hashPassword = await argon2.hash(password);
        
        const newUser = new UserModel({
            username: username, 
            name: name, 
            hashedPassword: hashPassword, 
            role: role, 
            department: department
        })
        const result = await newUser.save();
        console.log(`user saved: ${result}`);
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                username: newUser.username,
                name: newUser.name,
                role: newUser.role,
                department: newUser.department,
            }
        });
    } catch(err) {
        console.error("Error while registering new user");
        console.error(err);
        res.status(500).json({
            message: "Internal server error !",
        });
    }
});

authRouter.post('/login', async(req, res) => {
    try{
        const {username, password} = req.body;

        console.log(`Login request for ${username}`);

        const find_user = await UserModel.findOne({username});

        if(!find_user) {
            console.log("no user found");
            return res.status(401).json({
                message: "Invalid username or password",
            })
        }

        const isMatch = await argon2.verify(find_user.hashedPassword, password);

        if(!isMatch) {
            console.log("password mismatch");
            return res.status(401).json({
                message: "Invalid username or password",
            })
        }

        const token = jwt.sign(
            {
                username: find_user.username,
                role: find_user.role,
                department: find_user.department,
                name: find_user.name,
            },
            process.env.JWT_SECRET, 
            {
                expiresIn: '1h',
            }
        )

        // We should return this token in httpOnly cookie.
        // But I am getting error, so I will return it as json response

        res.status(200).json({
            message: "Login Successful",
            auth_token: token,
            name: find_user.name,
            username: find_user.username,
            role: find_user.role,
            department: find_user.department,
        })

    } catch(err) {
        console.error("Error while login");
        console.error(err);
        res.status(500).json({
            message: "Internal server error",
        })
    }
});

module.exports = authRouter;