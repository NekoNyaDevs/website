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
        if(err.code === 404) return res.status(404).render('404');
        res.status(err.code || 501).render('globalerror', {
            page: req.url,
            error: err,
            status: res.statusCode || err.code || 501
        });
    };
};