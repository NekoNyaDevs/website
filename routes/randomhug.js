const express = require('express');


module.exports = {
    path: "/randomhug",
    method: "get",
    router: (req, res, data, logger) => {
        return res.render('randomhug', {
            page: req.url
        });
    }
};