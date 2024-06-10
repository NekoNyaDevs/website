const express = require('express');

module.exports = [
    {
        path: "/random/:type",
        method: "get",
        router: (req, res, data, logger) => {
            const type = req.params.type;
            if (!type) return res.redirect('/random/neko');
            if (!['neko', 'kitsune', 'lewd', 'hug', 'kiss', 'pat', 'slap'].includes(type)) return res.redirect('/random/neko');

            return res.render('random', {
                page: req.url,
                type: type
            });
        }
    },
    {
        path: "/random",
        method: "get",
        router: (req, res) => {
            return res.redirect('/random/neko');
        }
    }
];