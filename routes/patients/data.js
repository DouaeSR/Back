const express = require('express');
const router = express.Router();
const {getPatientData, updatePatientData}= require('../../controllers/patients/data')
const auth = require('../../middlewares/auth.js');

router.get('/getpatientdata',auth, getPatientData);
router.put('/update',auth,updatePatientData)


module.exports = router;