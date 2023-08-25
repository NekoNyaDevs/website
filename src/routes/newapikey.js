const express = require('express');


module.exports = {
    path: "/newapikey",
    method: "get",
    router: (req, res, logger, data) => {
        const password = req.query.password;
        if(password && password === process.env.PASSWORD) {
            return res.render('newapikey.ejs', {
                page: req.url,
                password: password
            });
        }
        return res.render('index', {
            page: req.url
        });
    }
};