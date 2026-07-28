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
        // Only attempt to connect to Redis if a URL is provided. This prevents startup failures
        // on hosting platforms where Redis isn't attached yet.
        if (process.env.REDIS_URL || process.env.DB_URL || process.env.REDIS) {
            await redisClient.connect();
            console.log('connected to redis');
        } else {
            console.log('No Redis URL provided, skipping redis connect');
        }

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server listening on port ${PORT}`);
        });
    } catch (err) {
        console.error('failed to start server', err);
        // Exit with non-zero so the platform knows the start failed
        process.exit(1);
    }
}
startServer();
