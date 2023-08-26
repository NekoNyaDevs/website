const express = require('express');
const router = express.Router();
const { readdirSync, readFileSync } = require('fs');
const { join } = require('path');
const showdown = require('showdown');

router.get('/:id', (req, res) => {
    const blogs = readdirSync(join(__dirname, '..', '..', '..', 'web', 'blogcontent'));
    const blogData = [];
    for (const blog of blogs) {
        const data = require(join(__dirname, '..', '..', '..', 'web', 'blogcontent', blog, 'data.json'));
        blogData.push(data);
    }

    const blog = blogData.find(blog => blog.id === req.params.id);

    if(!blog) {
        return res.redirect('/blog');
    }

    const converter = new showdown.Converter();

    const markdown = readFileSync(join(__dirname, '..', '..', '..', 'web', 'blogcontent', blog.id, 'content.md'), 'utf-8');
    const html = converter.makeHtml(markdown);

    return res.render('blog/view', {
        page: req.baseUrl + req.path,
        blog,
        parsedMarkdown: html
    });
});

module.exports = router;