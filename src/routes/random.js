const express = require('express');


module.exports = {
    path: "/random/:type",
    method: "get",
    router: (req, res, logger, data) => {
        const type = req.params.type;
        if (!type) return res.status(400).json({ message: 'Bad request.' });
        if (!['neko', 'kitsune', 'lewd', 'hug', 'kiss', 'pat', 'slap'].includes(type)) return res.redirect('/random/neko');

        return res.render('random', {
            page: req.path,
            type: type
        });
    }
};