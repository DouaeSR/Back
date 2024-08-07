const express = require('express');
const router = express.Router();
const auth = require('../../middlewares/auth.js');
const {login, getAllPatients,getNewDoctors,approveDoctor,deleteDoctor, deletePatient}= require('../../controllers/admin/accounts')


router.post('/login', login);
router.get('/getallpatients',auth,getAllPatients)
router.get('/newdoctors', auth,getNewDoctors);
router.patch('/approve/:id', approveDoctor);
router.delete('/delete/:id', auth, deleteDoctor);
router.delete('/delete/patient/:id',auth,deletePatient)


module.exports = router;