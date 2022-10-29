const express = require('express');
const api = express.Router();
const azure = require('@azure/storage-blob');
const request = require("superagent");
const blobs = require('../index.js').blobs;



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
 * @param {azure.ContainerClient} blobClient
 * @param {string} prefix
 * @returns {Promise<string>}
 */
async function getRandomURL(blobClient, prefix) {
    const blobs = blobClient.listBlobsByHierarchy("/", { prefix: prefix });
    const arr = [];
    for await (const blob of blobs) {
        arr.push(blob);
    }
    if(arr.length <= 0) return null;
    return `${process.env.CDNURL}/${blobClient.containerName}/${arr[Math.floor(Math.random() * arr.length)]?.name}`;
}

api.get('/v1/random/:type', async (req, res) => {
    const type = req.params.type;
    //return res.status(503).json({ message: 'Service Temporary Unavailable - Maintenance occurring on API.' })
    switch(type) {
        case 'neko':
            const nekourl = await getRandomURL(blobs.getContainerClient('nekos'), 'normal/');
            res.status(200).json({ url: nekourl ? nekourl : 'No Neko :/' });
            break;
        case 'kitsune':
            const kitsuneurl = await getRandomURL(blobs.getContainerClient('kitsunes'), 'normal/');
            res.status(200).json({ url: kitsuneurl ? kitsuneurl : 'No Kitsune :/' });
            break;
        case 'lewd':
            const lewdurl = await getRandomURL(blobs.getContainerClient('nekos'), 'lewd/');
            res.status(200).json({ url: lewdurl ? lewdurl : 'No Lewd Neko :/' });
            break;
        case 'hug':
            const hugurl = await getRandomURL(blobs.getContainerClient('hugs'), '');
            res.status(200).json({ url: hugurl ? hugurl : 'No Hug :/' });
            break;
        case 'kiss':
            const kissurl = await getRandomURL(blobs.getContainerClient('kisses'), '');
            res.status(200).json({ url: kissurl ? kissurl : 'No Kiss :/' });
            break;
        case 'pat':
            const paturl = await getRandomURL(blobs.getContainerClient('pats'), '');
            res.status(200).json({ url: paturl ? paturl : 'No Pat :/' });
            break;
        case 'pfp':
            const pfpurl = await getRandomURL(blobs.getContainerClient('nekos'), 'pfp/');
            res.status(200).json({ url: pfpurl ? pfpurl : 'No PFP :/' });
            break;
        default:
            res.status(404).json({ message: 'Not Found' });
            break;
    }
});


module.exports = api;