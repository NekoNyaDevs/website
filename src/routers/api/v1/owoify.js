const { Router } = require('express');
const router = Router();
const fs = require('fs');

router.get('/', (req, res) => {
    const text = req.query.text;
    if(!text) return res.status(400).json({ message: 'Missing text query' });
    const owo = text.replace(/(?:r|l)/g, "w").replace(/(?:R|L)/g, "W").replace(/n([aeiou])/g, 'ny$1').replace(/N([aeiou])/g, 'Ny$1').replace(/N([AEIOU])/g, 'Ny$1').replace(/ove/g, "uv");
    res.status(200).json({ result: owo });
});


module.exports = router;