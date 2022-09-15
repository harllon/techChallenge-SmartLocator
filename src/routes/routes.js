const express = require('express');
const router = express.Router();
router.use(express.static(__dirname))
const path = require('path');
const db = require('../database/userQueries')
const auth = require('../auth/authController')

router.get('/', (req, res, next) =>{
    res.status(200).render(path.join(__dirname, '../views/login.html'));
});

router.get('/user/beer', (req, res, next) => {
    res.status(200).render(path.join(__dirname, '../views/beer.html'));
});

router.get('/users', db.getUsers)
router.get('/users/:id', db.getUserById)
router.post('/users', db.createUser)
router.put('/users/:id', db.updateUser)
router.delete('/users/:id', db.deleteUser)

router.get('/auth/logout', auth.logoutUser)
router.get('/auth/checkAuth', auth.authUser)
router.post('/auth/login', auth.loginUser)


module.exports = router;