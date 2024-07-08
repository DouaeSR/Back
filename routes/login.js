const express = require('express');
const router = express.Router();
const {login}= require('../controllers/admin/LogIn')

router.post('/login',  login);


module.exports = router;