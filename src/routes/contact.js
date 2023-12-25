const express = require('express');


module.exports = {
    path: "/i/contact",
    method: "get",
    router: (req, res, data, logger) => {
        return res.redirect('mailto://worldwild.studios@gmail.com');
    }
};