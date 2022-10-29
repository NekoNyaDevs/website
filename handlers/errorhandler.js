const express = require('express');
const error = require('../error');

module.exports = (logger) => {
    /**
     *
     * @param {error} err
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     */
    return (err, req, res, next) => {
        if(err.code !== 404) logger.error(err.message, "Error");
        res.status(err.code || 501).render('error', {
            page: req.url,
            error: err,
            status: res.statusCode || err.code || 501
        });
    };
};