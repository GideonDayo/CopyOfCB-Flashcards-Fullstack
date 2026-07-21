const { createClient } = require('redis');

const redisClient = createClient({ url: process.env.DB_URL });
redisClient.on('error', (error) => console.error("Redis Error", error));

module.exports = redisClient;