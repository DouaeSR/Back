const express = require('express');
const router = express.Router();
const {getDoctors,searchDoctor,getSingleDoctor}= require('../../controllers/patients/doctors')
const auth = require('../../middlewares/auth.js');


router.get('/getdoctors',getDoctors);
router.post('/searchdoctor', searchDoctor);
router.get('/getsingledoctor/:id',getSingleDoctor);


module.exports = router;