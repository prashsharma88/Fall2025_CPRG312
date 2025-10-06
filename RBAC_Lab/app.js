require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/auth');
const adminRouter = require('./routes/admin');
const projRouter = require('./routes/project');
const cookieParser = require('cookie-parser');      // <<- new dependency to parse cookie

const app = express();

app.use(cookieParser()) // to parse cookie header and extract JWT token from it.

const FRONTEND_URL = "http://localhost:5173";

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}))


app.use(bodyParser.json());

app.use('/api/auth', router);

app.use('/authorize', adminRouter);

app.use('/project', projRouter);

app.get('/', (req, res) => {
    res.send("This is a node server for RBAC lab, please login/register to begin");
});

async function connectToDB() {
    try{
        await mongoose.connect(process.env.DB_URL+'/'+process.env.DB_NAME);
        console.log("Connected to database");
    } catch(err) {
        console.error("Error while connecting to database");
        console.error(err);
    }
}

http.createServer(app).listen(process.env.PORT, async (req,res) => {
    await connectToDB();
    console.log(`server is running on port: ${process.env.PORT}`);
});