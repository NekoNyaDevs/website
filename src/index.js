const express = require('express');
const app = express();
const sl = require('@classycrafter/super-logger');
const fs = require('fs');
require('dotenv').config();
const cors = require('cors');
const compression = require('compression');
const path = require('path');

if(!fs.existsSync('./logs')) fs.mkdirSync('./logs');

const logger = new sl.Logger({
    name: 'NekoNya',
    timezone: 'Europe/Paris',
    tzformat: 24,
    writelogs: true,
    dirpath: './logs',
    colored: true,
    enablecustom: false
});

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        return false;
    }
    return compression.filter(req, res);
}

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'web', 'views'));
app.set('host', process.env.HOST || 'localhost');
app.use(cors());
app.use(compression({
    level: 6,
    filter: shouldCompress
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', require('./routers/api')(logger));
app.use('/static', express.static(path.join(__dirname, '..', 'web', 'static')));
app.use(require('./handlers/logging.js')(logger));

const isValidMethod = (method) => {
    return ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(method.toUpperCase());
};

const main = async () => {
    const routes = fs.readdirSync(path.join(__dirname, 'routes')).filter(file => file.endsWith('.js'));
    for (const file of routes) {
        const route = require(`./routes/${file}`);
        if(route.path && isValidMethod(route.method)) {
            const run = (req, res) => {
                // conditions before run here

                return route.router(req, res, logger, {});
            };
            app[route.method.toLowerCase()](route.path, run);
            logger.info(`Loaded route ${route.path} (${route.method.toUpperCase()})`, 'Express');
        }
    }

    app.use(require('./handlers/404handler.js')(logger));
    app.use(require('./handlers/errorhandler.js')(logger));

    app.listen(process.env.PORT, () => {
        logger.info(`Listening on port ${process.env.PORT}`, 'Express');
    });
};

main().catch(err => {
    logger.fatal(err.stack, 'Express');
});

module.exports = {
    app
};