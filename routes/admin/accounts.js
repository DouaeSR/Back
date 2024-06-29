const express = require('express');
const router = express.Router();
const {login, getAllPatients}= require('../../controllers/admin/accounts')


router.post('/login', login);
router.get('/getallpatients',getAllPatients)


module.exports = router;