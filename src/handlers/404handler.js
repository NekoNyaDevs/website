const express = require('express');
const error = require('../error');

module.exports = (logger) => {
    /**
     *
     * @param {express.Request} req
     * @param {express.Response} res
     * @param {express.NextFunction} next
     */
    return (req, res, next) => {
        const err = new error(404, 'Page not found');
        res.status(404);
        next(err);
    };
};