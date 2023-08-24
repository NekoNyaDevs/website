const { Router } = require('express');
const router = Router();
const fs = require('fs');
const infos = require('../infos');

router.get('/', (req, res) => {
    const cute = req.query.cute ? req.query.cute : false;
    let answers = infos.v1.eightballAnswers.normal;
    if(cute) answers = infos.v1.eightballAnswers.cute;

    res.status(200).json({ answer: answers[Math.floor(Math.random() * answers.length)] });
});


module.exports = router;