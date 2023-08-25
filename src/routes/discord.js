const express = require('express');


module.exports = {
    path: "/discord",
    method: "get",
    router: (req, res, logger, data) => {
        return res.redirect('https://discord.gg/Vh4bnWP5tc');
    }
};