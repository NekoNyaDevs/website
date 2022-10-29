const express = require('express');


module.exports = {
    path: "/randompat",
    method: "get",
    router: (req, res, data, logger) => {
        return res.render('randompat', {
            page: req.url
        });
    }
};