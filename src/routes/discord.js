const express = require('express');


module.exports = {
    path: "/l/discord",
    method: "get",
    router: (req, res, data, logger) => {
        return res.redirect('https://discord.gg/Vh4bnWP5tc');
    }
};