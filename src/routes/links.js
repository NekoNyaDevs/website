const express = require('express');

module.exports = [
    {
        path: "/l/contact",
        method: "get",
        router: (req, res) => {
            return res.redirect('mailto://contact@classydev.fr');
        }
    },
    {
        path: "/l/discord",
        method: "get",
        router: (req, res) => {
            return res.redirect('https://discord.gg/Vh4bnWP5tc');
        }
    }
];