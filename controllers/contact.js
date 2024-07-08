
const Message = require('../models/messageModel');

require('dotenv').config();

exports.postMessages =async (req, res) => {
    try {
        const { email, message } = req.body;
        const newMessage = new Message({ email, message });
        await newMessage.save();
        res.status(201).send(newMessage);
    } catch (error) {
        res.status(400).send(error);
    }
};


exports.getMessages = async (req, res) => {
    try {
        const messages = await Message.find();
        res.status(200).send(messages);
    } catch (error) {
        res.status(400).send(error);
    }
};

exports.getAllMessages= async (req, res) => {
    try {
      const messages = await Message.find();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  exports.deleteMessage = async (req, res) => {
    try {
      const MessageId = req.params.id;
      await Message.findByIdAndDelete(MessageId);
      res.status(200).json({ message: 'message deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the message.' });
    }
  };

  exports.getSingleMessage = (req, res, next) => { 
    Message.findById(req.params.id)
   .then(singleMessage => res.status(200).json(singleMessage))
   .catch(error => res.status(400).json({error}))

 };