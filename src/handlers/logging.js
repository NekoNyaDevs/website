const express = require('express');
const chalk = require('chalk');

function isGoodStatus(code) {
    return code >= 200 && code < 400;
}

const getMs = (start) => {
    const NS_PER_SEC = 1e9; //  convert to nanoseconds
    const NS_TO_MS = 1e6; // convert to milliseconds
    const diff = process.hrtime(start);
    return ((diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS).toLocaleString();
};

const timingColor = (ms) => {
    let msnum;
    if(typeof ms === "string") msnum = parseInt(ms);
    else msnum = ms;

    if(msnum < 100) return chalk.green(ms + "ms");
    else if(msnum < 500) return chalk.yellow(ms + "ms");
    else return chalk.red(ms + "ms");
};

module.exports = (logger) => {
    return (req, res, next) => {
        next();
        const ms = getMs(process.hrtime());
        if(!isGoodStatus(res.statusCode)) return logger.warn(`${req.method} @${req.originalUrl} - ${res.statusCode} (${timingColor(ms)})`, "Express");
        logger.info(`${req.method} @${req.originalUrl} - ${res.statusCode} (${timingColor(ms)})`, "Express");
    };
};