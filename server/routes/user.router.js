const express = require('express');
const router = express.Router();
const {Signup,Login} = require('../controller/user.controller.js')

router.post('/signup', Signup);
router.post('/login', Login);

module.exports = router;