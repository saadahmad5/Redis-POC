const express = require("express");
const redis = require("redis");
const keys = require("./middleware/keys");
const redisMiddleware = require("./middleware/redis");

const api = require("./swapi/api");

const routes = express.Router();

routes.use(redisMiddleware);
const client = redis.createClient({
    url: `redis://${keys.redisHost}:${keys.redisPort}`
});

routes.get("/people", (request, response) => {
    api.fetchPeople().then(
        response => response.json(),
        reason => Promise.reject(reason),
    ).then(
        data => {
            console.log(`Data fetched from API from /people endpoint. PID - ${process.pid}`);
            client.set("people", JSON.stringify(data));
            response.send(data);
        },
        reason => response.status(500).send("<h2>Something went wrong</h2>")
    );
});

routes.get("/starship", (request, response) => {
    api.fetchStarShip().then(
        response => response.json(),
        reason => Promise.reject(reason),
    ).then(
        data => {
            console.log(`Data fetched from API from /starships/9 endpoint. PID - ${process.pid}`);
            client.setex("starship", 20, JSON.stringify(data));
            response.send(data);
        },
        reason => response.status(500).send("<h2>Something went wrong</h2>")
    );
})

module.exports = routes;