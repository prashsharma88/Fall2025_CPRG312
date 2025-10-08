require('dotenv').config();
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRouter = require('./routes/auth');
const cors = require('cors');
const authorizedRouter = require('./routes/authorizedRoutes');

// creating an instance of express app.
const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
}));

app.use(bodyParser.json());

// adding Authentication routes.
app.use('/api/auth', authRouter);

// adding Authorized Routes.
app.use('/authorize', authorizedRouter);

async function connectToDB() {
    try{
        await mongoose.connect(process.env.DB_URL+'/'+process.env.DB_NAME);
        console.log("Connected to DB");
    } catch(err) {
        console.error("Error while connecting to DB");
        console.error(err);
    }
}

http.createServer(app).listen(process.env.PORT, async() => {
    await connectToDB();
    console.log(`Server is running on port: ${process.env.PORT}`);
} )