const express = require('express');
const router = express.Router();
router.use(express.static(__dirname))
const path = require('path');
const route = router.get('/', (req, res, next) =>{
    //res.status(200).render(path.join(__dirname, '/index.html'), {nome:nome});
});

module.exports = router;