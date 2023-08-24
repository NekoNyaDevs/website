const fs = require('fs');
const {Router} = require('express');
const fetch = require('node-fetch');

const router = Router();

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

router.get('/:type', async (req, res) => {
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


module.exports = router;