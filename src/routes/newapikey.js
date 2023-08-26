const express = require('express');


module.exports = {
    path: "/newapikey",
    method: "get",
    router: (req, res, logger, data) => {
        const password = req.query.password;
        if(password && password === process.env.PASSWORD) {
            return res.render('newapikey.ejs', {
                page: req.path,
                password: password
            });
        }
        return res.render('index', {
            page: req.path
        });
    }
};