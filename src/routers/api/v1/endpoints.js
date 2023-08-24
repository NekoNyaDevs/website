const { Router } = require('express');
const router = Router();
const fs = require('fs');
const infos = require('../infos');

router.get('/', (req, res) => {
    res.status(200).json(infos.v1.endpoints);
});


module.exports = router;