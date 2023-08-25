const limiter = require('express-rate-limit');

/**
 * This is just a simple one for the no-version API. Otherwise, we'll use API Keys for limitations.
 */
const baseAPILimiter = limiter({
    windowMs: 60 * 1000,
    max: 100,
    message: {
        status: 429,
        error: {
            code: 429,
            message: 'Too many requests, please try again later.',
            text: 'TOO_MANY_REQUESTS'
        }
    },
    legacyHeaders: false,
    standardHeaders: true
});

module.exports = baseAPILimiter;