const { error } = require('console');
const express = require('express')
const app = express()
require('dotenv').config()
const redis = require('redis');
const { json } = require('stream/consumers');
const client = redis.createClient()
const PORT = 3000;
const path = require('path')

app.use(express.json())

async function start() {
    await client.connect()
}

start()

async function checkCache(req, res, next) {
    const weatherToken = process.env.TOKEN
    const key = req.body.key
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${key}?unitGroup=us&key=${weatherToken}&contentType=json`

    try {
        const value = await client.get(key)

        if (value != null) {
            res.json(JSON.parse(value))
        } else {
            await fetch(url)
                .then((data) => data.json(data))
                .then((data) => JSON.stringify(data))
                .then((value) => {
                    client.set(key, value)
                    res.json(JSON.parse(value))
                })
            }
    } catch (error) {
        console.log(error)
    }
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/api/weather', checkCache, (req, res) => {
    console.log('Fetching data from the API')
})

app.listen(PORT, () => console.log('Server listening on port ', PORT))
