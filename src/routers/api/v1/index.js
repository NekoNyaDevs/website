const fs = require('fs');
const {Router} = require('express');
const path = require('path');
const infos = require('../infos');

const router = Router();

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
}


module.exports = router;