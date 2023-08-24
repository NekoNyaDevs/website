const fs = require('fs');
const {Router} = require('express');
const {Logger} = require('@classycrafter/super-logger');
const infos = require('./infos');

/**
 *
 * @param {Logger} logger
 * @returns {Router}
 */
module.exports = (logger) => {
    const router = Router();

    router.get('/', (req, res) => {
        res.status(200).json({
            status: 200,
            code: 'OK',
            message: 'API Operationnal.',
            latest: infos.latest,
            outdated: infos.outdated,
            supported: infos.supported
        });
    });

    fs.readdirSync(__dirname).forEach(dir => {
        if(dir === 'index.js' || dir  === 'infos.js') return;
        const route = require('./' + dir);
        router.use(`/${dir}/`, route);
        logger.info(`Loaded API version ${dir}`, 'API');
    });

    return router;
};