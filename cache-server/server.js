const express = require('express')
const fetch = require('node-fetch');
const redis = require('redis')
const { parse } = require('graphql');
const { print } = require('graphql');
const app = express();

const redisPort = 6379
const client = redis.createClient(redisPort)

client.on("error", err => {
    console.log(err);
});

app.use(express.json())

app.post("/query", async(req, res) => {

    try {

        var qresult; 
        var qbody = print(parse(req.body.query));

        client.get(qbody, async (err, value) => {

            if(err) throw err;

            if(value) {
                res.status(200).send({
                    data: value,
                    message: "data retrieved from the cache"
                });
            }
            else {
                await fetch('http://localhost:4000/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/graphql',
                        'Accept': 'application/json',
                    },
                    body: qbody
                })
                .then(r => r.json())
                .then(data => qresult = JSON.stringify(data));

                client.setex(qbody, 600, qresult);
                res.status(200).send({
                    data: qresult,
                    message: "data retrieved from graphql server"
                });
            }
        })
    }
    catch(err) {
        res.status(500).send({message: err.message});
    }
});

app.listen(4001);
console.log('Running proxy server at http://localhost:4001/query');