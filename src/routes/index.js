const express = require('express');


module.exports = {
    path: "/",
    method: "get",
    router: (req, res, logger, data) => {
        return res.status(200).render('index', {
            page: req.path
        });
    }
};