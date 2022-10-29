const express = require('express');


module.exports = {
    path: "/randomkiss",
    method: "get",
    router: (req, res, data, logger) => {
        return res.render('randomkiss', {
            page: req.url
        });
    }
};