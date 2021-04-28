const express = require('express')
const fetch = require('node-fetch');
const redis = require('redis')
const { parse } = require('graphql');
const { print } = require('graphql');
const app = express();

//initialisation redis
const redisPort = 6379
const client = redis.createClient(redisPort)

client.on("error", err => {
    console.log(err);
});

app.use(express.json())

//recup query post
app.post("/query", async(req, res) => {

    try {

        //recuperation et formatage de la requete graphql
        var qresult; 
        var qbody = print(parse(req.body.query));

        //on tente de recuperer la valeur dans le cache
        client.get(qbody, async (err, value) => {

            if(err) throw err;

            //si elle est dans le cache on la renvoie au client
            if(value) {
                res.status(200).send({
                    data: value,
                    message: "data retrieved from the cache"
                });
            }
            //sinon on la recupere via le serveur graphql
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

                //on la stocke dans le cache
                client.setex(qbody, 600, qresult);

                //et on la renvoie au client
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