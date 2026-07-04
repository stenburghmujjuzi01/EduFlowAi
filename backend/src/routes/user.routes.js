const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

// POST /api/users - register a new user
router.post('/', userController.register);

// GET /api/users/:phone - look up a user by phone number
router.get('/:phone', userController.getByPhone);

module.exports = router;