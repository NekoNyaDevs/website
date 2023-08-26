const express = require('express');
const router = express.Router();
const { readdirSync } = require('fs');
const { join } = require('path');

const viewRoute = require('./view');

module.exports = (logger) => {
    router.get('/', (req, res) => {
        const blogs = readdirSync(join(__dirname, '..', '..', '..', 'web', 'blogcontent'));
        const blogData = [];
        for (const blog of blogs) {
            const data = require(join(__dirname, '..', '..', '..', 'web', 'blogcontent', blog, 'data.json'));
            blogData.push(data);
        }

        return res.render('blog/index', {
            page: req.baseUrl + req.path,
            blogs: blogData
        });
    });

    router.use('/view', viewRoute);

    return router;
};