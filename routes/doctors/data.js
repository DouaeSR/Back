
const express = require('express');
const router = express.Router();
const {getDoctorsData}= require('../../controllers/doctors/data')
const auth = require('../../middlewares/auth.js');

router.get('/getdoctorsdata',auth, getDoctorsData);



module.exports = router;