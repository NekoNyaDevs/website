const express = require("express");
const app = express();
const azure = require("@azure/storage-blob");
const Blobs = require("./structures/blobs");
const sl = require('@classycrafter/super-logger');
const fs = require("fs");
require('dotenv').config();

if(!fs.existsSync('./logs')) fs.mkdirSync('./logs');

const logger = new sl.Logger({
    name: 'NekoNya',
    timezone: 'Europe/Paris',
    tzformat: 24,
    writelogs: true,
    dirpath: './logs'
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(require('./handlers/logging.js')(logger));
app.use('/static', express.static(__dirname + "/src"));
app.use('/scripts', express.static(__dirname + '/src/scripts'));
app.use('/api', require('./routers/api'));

const blobs = new Blobs(process.env.ACCOUNT, process.env.KEY);
const cdnUrl = process.env.CDNURL;

const isValidMethod = (method) => {
    return ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(method.toUpperCase());
};


const main = async () => {
    const routes = fs.readdirSync('./routes').filter(file => file.endsWith('.js'));
    for (const file of routes) {
        const route = require(`./routes/${file}`);
        if(route.path && isValidMethod(route.method)) {
            const run = (req, res) => {
                // conditions before run here

                return route.router(req, res, logger, {});
            };
            app[route.method.toLowerCase()](route.path, run);
            logger.info(`Loaded route ${route.path} (${route.method.toUpperCase()})`, "Express");
        }
    }

    app.use(require('./handlers/404handler.js')(logger));
    app.use(require('./handlers/errorhandler.js')(logger));

    app.listen(process.env.PORT, () => {
        logger.info(`Listening on port ${process.env.PORT}`, "Express");
    });
};

main().catch(err => {
    logger.error(err.stack, "Express");
    process.exit(1);
});

module.exports = {
    app,
    blobs
};