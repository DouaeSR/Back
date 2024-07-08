
const express = require('express');
const router = express.Router();
const {getDoctorsData, updateDoctorData}= require('../../controllers/doctors/data')
const auth = require('../../middlewares/auth.js');

router.get('/getdoctorsdata',auth, getDoctorsData);
router.put('/update',auth, updateDoctorData);



module.exports = router;