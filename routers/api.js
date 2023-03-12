const express = require('express');
const api = express.Router();
const request = require("superagent");
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
    0: "GET        /api/v1/random/<neko, kitsune, lewd, hug, kiss, pat>"
};

api.get('/v1/endpoints', (req, res) => {
    res.status(200).json(v1Endpoints);
});

api.get('/v1/download', (req, res) => {
    const file = req.query.file;
    if(!file) return res.status(400).json({ message: 'Bad request.' });
    if(!file.startsWith(process.env.CDNURL)) return res.status(400).json({ message: 'Bad request.' });
    const filename = file.split('/').pop();
    res.set(
        'Content-Disposition',
        'attachment; filename=' + filename
    );
    request(file).pipe(res);
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
    }).then(res => res.json());
    const arr = res.data.files;
    if(arr.length <= 0) return null;
    return `${process.env.STORAGEURL}/images/${prefix}/${arr[Math.floor(Math.random() * arr.length)]}`;
}

api.get('/v1/random/:type', async (req, res) => {
    const type = req.params.type;
    //return res.status(503).json({ message: 'Service Temporary Unavailable - Maintenance occurring on API.' })
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
        default:
            res.status(404).json({ message: 'Not Found' });
            break;
    }
});


module.exports = api;