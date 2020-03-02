const express = require("express");
const fetch = require("node-fetch");
const redis = require("redis");
require('dotenv-flow').config();

const PORT = process.env.PORT || 8080;
const REDIS_PORT = process.env.REDIS_URL || 6379;

const app = express();
const redisClient = redis.createClient(REDIS_PORT);

//Make request to GitHub for data
async function getPublicReposNumber(req, res, next) {
    const {username} = req.params;

    // Get cache from redis by username
    redisClient.get(username, async (err, reply) => {

        // if reply exists
        if (reply) res.status(200).send(reply);
        // else reply not exists -> set to redis
        else {
            console.log("Fetching data...");
            const response = await fetch(`https://api.github.com/users/${username}`);
            const data = await response.json();
            //set to redis
            redisClient.set(username, JSON.stringify(data), redis.print);
            res.status(200).send(data);
        }
    });
}

app.get("/repos/:username", getPublicReposNumber);

app.listen(PORT, () => {
    console.log(`Server1 listening on port ${PORT}...`);
    redisClient.on('connect', () => console.log('Redis Client connected...'));
    redisClient.on('error', err => console.log('Something went wrong ' + err));
});