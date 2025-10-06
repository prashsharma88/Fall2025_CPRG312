const express = require('express');
const decode = require('../middleware/decodeJWT');
const authorizeRequest = require('../middleware/authorize');

const projRouter = express.Router();

projRouter.use(decode);

projRouter.get('/demo-project', authorizeRequest(['user','admin','manager','dev','test','intern']), (req, res) => {
    console.log(`GET-project: Anyone can see project details`);
    console.log(`Current User: ${req.user.name}`);
    res.status(200).json(
        {
            status: "Success",
            message: "Welcome: "+req.user.name,
            project: {
                id: "proj-1234",
                name: 'DEMO PROJECT',
                client: 'XYZ inc',
                manager: 'John Doe',
            }
        }
    );
});

projRouter.post('/', authorizeRequest(['manager']), (req, res) => {
    console.log("POST-project: Only user with MANAGER role can execute a POST request");
    res.status(201).json({
        status: "Success",
        message: "New Project created",
        project: {
            id: "proj-999",
            name: "NEW PROJECT",
            client: "ZZZ inc",
            manager: req.user.name,
        }
    })
});

projRouter.post('/issue', authorizeRequest(['test']), (req, res) => {
    console.log("POST-project/issue : Only user with TEST role can create a new issue");
    res.status(201).json({
        status: "Success",
        messages: "New issue created in project - DEMO PROJECT",
        issue: {
            id: "demo-proj-issue-1122",
            project: 'DEMO PROJECT',
            title: "Login UI is not responsive",
            issue_status: "OPEN",
            assigned_to: "none",
        }
    })
});



module.exports = projRouter;