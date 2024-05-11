
const express = require('express');
const router = express.Router();
const {signup, login}= require('../../controllers/patients/accounts')
const cors = require('cors')

router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:3000'
    })
)

router.post('/signup', signup);
router.post('/login',  login);


module.exports = router;