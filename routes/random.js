const express = require('express');


module.exports = {
    path: "/random",
    method: "get",
    router: (req, res, data, logger) => {
        return res.render('random', {
            page: req.url
        });
    }
};