const express = require('express');


module.exports = {
    path: "/randomkitsune",
    method: "get",
    router: (req, res, data, logger) => {
        return res.render('randomkitsune', {
            page: req.url
        });
    }
};