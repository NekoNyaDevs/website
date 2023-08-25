const express = require('express');


module.exports = {
    path: "/contact",
    method: "get",
    router: (req, res, logger, data) => {
        return res.redirect('mailto://worldwild.studios@gmail.com');
    }
};