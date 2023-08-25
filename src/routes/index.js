const express = require('express');


module.exports = {
    path: "/",
    method: "get",
    router: (req, res, logger, data) => {
        return res.render('index', {
            page: req.url
        });
    }
};