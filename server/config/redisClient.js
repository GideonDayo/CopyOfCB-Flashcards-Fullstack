const { createClient } = require('redis');

// Allow multiple env var names so this works on Railway (REDIS_URL) and other platforms (DB_URL)
const url = process.env.REDIS_URL || process.env.DB_URL || process.env.REDIS || undefined;

const options = url ? { url } : undefined;
const redisClient = createClient(options);
redisClient.on('error', (error) => console.error('Redis Error', error));

module.exports = redisClient;
