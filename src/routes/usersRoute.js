const express = require('express');
const router = express.Router();
const controller = require('../controllers/usersController')
const db = require('../database/queries')

router.get('/users', db.getUsers)
router.get('/users/:id', db.getUserById)
router.post('/users', db.createUser)
router.put('/users/:id', db.updateUser)

//router.post('/', controller.post);

//router.put('/:id', controller.put)

router.delete('/users/:id', db.deleteUser)

module.exports = router;