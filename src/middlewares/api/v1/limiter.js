const limiter = require('express-rate-limit');
const apikey = require('../../../models/apikey');

const v1Limiter = limiter({
    windowMs: 60 * 1000,
    max: async (req, res) => {
        const key = req.headers['x-api-key'];
        if(!key  || key.length > 32) return 100;
        const dbKey = await apikey.findOne({ key: key });
        if(!dbKey) return 100;
        if(dbKey.expiresAt > 0 && dbKey.expiresAt < Date.now()) return 10;
        if(dbKey.isDisabled) return 0;
        switch(dbKey.type) {
            case 0:
                return 100;
            case 1:
                return 200;
            case 2:
                return 1000;
            case 3:
                return 50000;
            default:
                return 100;
        }
    },
    message: {
        status: 429,
        error: {
            code: 429,
            message: 'Too many requests, please try again later.',
            text: 'TOO_MANY_REQUESTS'
        }
    },
    legacyHeaders: false,
    standardHeaders: true,
    skip: async (req, res) => {
        const key = req.headers['x-api-key'];
        if(!key) return false;
        const dbKey = await apikey.findOne({ key: key });
        if(!dbKey) return false;
        if(dbKey.expiresAt > 0 && dbKey.expiresAt < Date.now()) return false;
        return dbKey.type === 0 && !dbKey.isDisabled;
    }
});

module.exports = v1Limiter;