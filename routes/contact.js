const express = require('express');
const router = express.Router();
const {getMessages,postMessages, deleteMessage, getAllMessages, getSingleMessage}= require('../controllers/contact')
const auth = require('../middlewares/auth.js');

router.post('/postmessages',  postMessages);
router.get('/getmessages',getMessages)
router.delete('/delete/:id', auth, deleteMessage);
router.get('/getallmessages',getAllMessages)
router.get('/getsinglemessage/:id',getSingleMessage)


module.exports = router; 