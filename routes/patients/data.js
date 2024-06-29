const express = require('express');
const router = express.Router();
const {getPatientData}= require('../../controllers/patients/data')
const auth = require('../../middlewares/auth.js');

router.get('/getpatientdata',auth, getPatientData);



module.exports = router;