const express = require('express');
const router = express.Router();
const {getSinglePatient,getPatientsForDoctor,getTodaysAppointments}= require('../../controllers/doctors/patients')
const auth = require('../../middlewares/auth.js');



router.get('/getsinglepatient/:id',getSinglePatient);
router.get('/getdoctorpatients',auth,getPatientsForDoctor);
router.get('/todays-appointments', auth, getTodaysAppointments);


module.exports = router;