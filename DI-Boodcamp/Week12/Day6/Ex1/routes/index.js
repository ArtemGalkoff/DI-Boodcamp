const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, welcome to my Express app!');
});

router.get('/about', (req, res) => {
    res.send('This is the About page!');
});


module.exports = router;