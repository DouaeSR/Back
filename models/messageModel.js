const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    email: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    response: { type: String, default: '' },
});

module.exports = mongoose.model('Message', messageSchema);