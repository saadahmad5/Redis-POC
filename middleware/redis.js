const redis = require('redis');
const keys = require("./keys");

const client = redis.createClient({
    url: `redis://${keys.redisHost}:${keys.redisPort}`
});

function redisMiddleware(req, res, next) {
    
    switch(req.url) {
        case "/people":
            client.get("people", (err, reply) => {
                if (err) {
                    res.status(500).send("<h2>API responded with error</h2>");
                } else if (reply != null) {
                    res.send(reply);
                    console.log("From Redis Cache");
                } else {
                    next();
                }
            });
            break;

        case "/starship":
            client.get("starship", (err, reply) => {
                if (err) {
                    res.status(500).send("<h2>API responded with error</h2>");
                } else if (reply != null) {
                    res.send(reply);
                    console.log("From Redis Cache");
                } else {
                    next();
                }
            });
            break;

        case "/clear":
            client.flushdb((err, succeeded) => {
                console.log(`Redis Cache cleared. Success: ${succeeded}`)
                res.send(`Redis Cache clear: ${succeeded}`);
            });
            break;

        case "/":
            res.status(200).send("<h2>Welcome to ExpressJS with Redis POC<h2>")
            break;
    }
}

module.exports = redisMiddleware;