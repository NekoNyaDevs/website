const express = require('express');


module.exports = {
    path: "/i/discord",
    method: "get",
    router: (req, res, data, logger) => {
        return res.redirect('https://discord.gg/Vh4bnWP5tc');
    }
};