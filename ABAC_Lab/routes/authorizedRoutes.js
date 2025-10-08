const express = require('express');
const { authorizeUser } = require('../middleware/authorize');
const decode = require('../middleware/decodeJWT');
const authorizedRouter = express.Router();

authorizedRouter.use(decode);

authorizedRouter.get('/payrolls', authorizeUser(['finance']), (req, res)=>{
    res.status(200).json({
        message: 'Authorized',
    })
});

authorizedRouter.get('/onboard', authorizeUser(['hr']), (req, res)=>{
    res.status(200).json({
        message: 'Authorized',
    })
});

authorizedRouter.get('/security', authorizeUser(['admin']), (req, res)=>{
    res.status(200).json({
        message: 'Authorized',
    })
});

authorizedRouter.get('/general', authorizeUser(['hr','admin','finance']), (req, res)=>{
    res.status(200).json({
        message: 'Authorized',
    })
});

module.exports = authorizedRouter;