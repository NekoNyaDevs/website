const express = require('express');


module.exports = {
    path: "/random/:type",
    method: "get",
    router: (req, res, data, logger) => {
        const type = req.params.type;
        if (!type) return res.status(400).json({ message: 'Bad request.' });
        if (!['neko', 'kitsune', 'lewd', 'hug', 'kiss', 'pat'].includes(type)) return res.redirect('/random/neko');

        return res.render('random', {
            page: req.url,
            type: type
        });
    }
};