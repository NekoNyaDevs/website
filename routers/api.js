const express = require('express');
const api = express.Router();
const fetch = require("node-fetch");

api.use(async (req, res, next) => {
    next();
});

api.get('/', async (req, res) => {
    res.redirect('/v1/');
});

api.get('/v1/', (req, res) => {
    res.status(200).json({ status: 200, code: 'OK', message: 'API Operationnal.', endpoints: '/api/v1/endpoints', latest: true })
});

const v1Endpoints = {
    0: "GET        /api/v1/random/<neko, kitsune, lewd, hug, kiss, pat, slap>"
};

api.get('/v1/endpoints', (req, res) => {
    res.status(200).json(v1Endpoints);
});

/**
 *
 * @param {string} prefix
 * @returns {Promise<string>}
 */
async function getRandomURL(prefix) {
    const res = await fetch(`${process.env.STORAGEURL}/api/v1/list/${prefix}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.STORAGETOKEN}`
        }
    }).then(res => res.json()).catch(err => {
        console.error(err);
        return null;
    });
    if (!res) return null;
    const arr = res.data.files;
    if(arr.length <= 0) return null;
    return `${process.env.STORAGEURL}/images/${prefix}/${arr[Math.floor(Math.random() * arr.length)]}`;
}

api.get('/v1/random/:type', async (req, res) => {
    const type = req.params.type;
    switch(type) {
        case 'neko':
            const nekourl = await getRandomURL('nekos');
            res.status(200).json({ url: nekourl ? nekourl : 'No Neko :/' });
            break;
        case 'kitsune':
            const kitsuneurl = await getRandomURL('kitsunes');
            res.status(200).json({ url: kitsuneurl ? kitsuneurl : 'No Kitsune :/' });
            break;
        case 'lewd':
            const lewdurl = await getRandomURL('lewds');
            res.status(200).json({ url: lewdurl ? lewdurl : 'No Lewd Neko :/' });
            break;
        case 'hug':
            const hugurl = await getRandomURL('hugs');
            res.status(200).json({ url: hugurl ? hugurl : 'No Hug :/' });
            break;
        case 'kiss':
            const kissurl = await getRandomURL('kisses');
            res.status(200).json({ url: kissurl ? kissurl : 'No Kiss :/' });
            break;
        case 'pat':
            const paturl = await getRandomURL('pats');
            res.status(200).json({ url: paturl ? paturl : 'No Pat :/' });
            break;
        case 'slap':
            const slapurl = await getRandomURL('slaps');
            res.status(200).json({ url: slapurl ? slapurl : 'No Slap :/' });
            break;
        default:
            res.status(404).json({ message: 'Not Found' });
            break;
    }
});

api.get('/v1/8ball', (req, res) => {
    const cute = req.query.cute ? req.query.cute : false;

    let answers = [
        "It is certain",
        "It is decidedly so",
        "Without a doubt",
        "Yes, definitely",
        "You may rely on it",

        "As I see it, yes",
        "Most likely",
        "Outlook good",
        "Yes",
        "Signs point to yes",

        "Reply hazy try again",
        "Ask again later",
        "Better not tell you now",
        "Cannot predict now",
        "Concentrate and ask again",

        "Don't count on it",
        "My reply is no",
        "My sources say no",
        "Outlook not so good",
        "Very doubtful"
    ];

    if(cute) {
        answers = [
            "Yes!!",
            "Of Cwurse!",
            "Yes, definitelwy nya!",
            "Without any doubts nya!",
            "My tail says yess!",

            "Mhh.. I think so!",
            "Most likely!",
            "Outwook good!",
            "Yesh!",
            "Signs point to yes!",

            "I don't know nya..",
            "Ask again later, nya!",
            "Better not twell you now!",
            "Cannot predict now..",
            "Concentrate and ask again! :3",

            "Don't count on it! >:c",
            ">-< My reply is nyo!",
            "My sources say nyo!",
            "Outlook nyot so good! :c",
            "Very doubtfwul!"
        ]
    }


    res.status(200).json({ answer: answers[Math.floor(Math.random() * answers.length)] });
});

api.get('/v1/owoify', (req, res) => {
    const text = req.query.text;
    if(!text) return res.status(400).json({ message: 'Missing text query' });
    const owo = text.replace(/(?:r|l)/g, "w").replace(/(?:R|L)/g, "W").replace(/n([aeiou])/g, 'ny$1').replace(/N([aeiou])/g, 'Ny$1').replace(/N([AEIOU])/g, 'Ny$1').replace(/ove/g, "uv");
    res.status(200).json({ result: owo });
});


module.exports = api;