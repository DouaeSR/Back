const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth.js');


const {addAppointment, getAppointmentPatient,getAppointmentDoctor,getSingleAppointment,updateStatus,getNumberOfAppointments}= require('../../controllers/patients/appointments.js')

router.post('/addAppointment',auth, addAppointment);
router.get('/getAppointmentPatient',auth, getAppointmentPatient);
router.get('/getAppointmentDoctor',auth, getAppointmentDoctor);
router.get('/getSingleAppointment',auth, getSingleAppointment);
router.put('/updateStatus',auth, updateStatus);
router.get('/count',auth,getNumberOfAppointments)





module.exports = router;