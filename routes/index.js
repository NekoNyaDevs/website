const express = require('express');


module.exports = {
    path: "/",
    method: "get",
    router: (req, res, data, logger) => {
        return res.render('index', {
            page: req.url
        });
    }
};