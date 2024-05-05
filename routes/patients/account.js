
const express = require('express');
const router = express.Router();
const {signupPatient, loginPatient}= require('../../controllers/patients/accounts')

router.post('/signup', signupPatient);
router.post('/login',  loginPatient);


module.exports = router;