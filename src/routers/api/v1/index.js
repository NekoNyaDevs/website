const fs = require('fs');
const {Router} = require('express');
const path = require('path');
const infos = require('../infos');
const v1Limiter = require('../../../middlewares/api/v1/limiter');

const router = Router();

module.exports = (logger) => {
    router.use(v1Limiter);

    router.get('/', (req, res) => {
        res.status(200).json({
            status: 200,
            code: 'OK',
            message: 'API Operationnal.',
            endpoints: '/api/v1/endpoints',
            latest: infos.latest === 'v1',
            outdated: infos.outdated.includes('v1'),
            supported: infos.supported.includes('v1')
        });
    });

    const files = fs.readdirSync(__dirname).filter(file => file !== path.basename(__filename) && file.endsWith('.js'));
    for (const file of files) {
        const route = require('./' + file);
        const fileName = file.replace('.js', '');
        router.use(`/${fileName}`, route);
        logger.info(`Loaded route /api/v1/${fileName}`, 'API');
    }

    return router;
}
