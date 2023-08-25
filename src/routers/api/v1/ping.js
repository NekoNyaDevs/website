const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: 'Pong!',
        status: 200,
        code: 'OK'
    });
});


module.exports = router;