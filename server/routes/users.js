const router = require('express').Router();
const redisClient = require('../config/redisClient');
require('dotenv').config();

router.get('/', async (req, res) => {
    try {
        const userData = await redisClient.hGetAll(process.env.DB_KEY);
        res.json(userData);
        console.log("get worked!")
    } catch (err) {
        console.log(err);
        res.status(500).json({error: err.message});
    }
});

router.post('/:id', async(req, res) => {
    try {
        const id = req.params.id;
        const userData = req.body;
        await redisClient.hSet(process.env.DB_KEY, id, JSON.stringify(userData));
        res.sendStatus(200);
        console.log("push worked!");
    } catch (err) {
        console.log(err.message);
        res.status(500).json({error: err.message});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await redisClient.hDel(process.env.DB_KEY, id);
        console.log("delete worked!");
        res.sendStatus(200);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const userData = req.body;
        await redisClient.hSet(process.env.DB_KEY, id, JSON.stringify(userData));
        res.sendStatus(200);
        console.log('put worked!')
    } catch (err) {
        res.status(500).json({error: err.message});
    }
})

module.exports = router;