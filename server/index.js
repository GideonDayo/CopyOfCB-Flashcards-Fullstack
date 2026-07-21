const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const questionsRouter = require('./routes/questions');
const usersRouter = require('./routes/users');
const redisClient = require('./config/redisClient');

const app = express();
app.use(express.json());

app.use('/api/questions', questionsRouter);
app.use('/api/users', usersRouter);

const startServer = async () => {
    try {
        await redisClient.connect();
        console.log('connected to redis');

        app.listen(process.env.PORT, () => {
            console.log(`Server on http://localhost:${process.env.PORT}`);
        });
    } catch (err) {
        console.log('failed to connect to redis', err);
    }
}
startServer();