import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import http from 'http';
import session from 'express-session';
import { PORT, SESSION_SECRET } from './const.js';
import authRouter from './routes/authRoutes.js';


const app = express();

// adding default values from helmet library. This library will configure security header.
app.use(helmet());

app.use(cors({
    origin: 'http://localhost:5173',
}));

// configuring session management.
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}     // set it true for https and production environment.
}));

app.use(authRouter);

app.get('/', (req, res) => {
    res.status(200).json({
        message: "The server is running.",
    })
})

http.createServer(app).listen(PORT, () => {
    console.log(`server is running of port: ${PORT}`);
});