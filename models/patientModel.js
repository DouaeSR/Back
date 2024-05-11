const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const patientSchema = mongoose.Schema ({
    firstName:{ type: String, required: true},
    lastName:{ type: String, required: true},
    birthday: { type: Date},
    gender: { type: String,  enum: ['male', 'female'] },
    email: { type: String, required: true, unique: true},
    password: {type: String, required: true}
});

patientSchema.plugin(uniqueValidator);

module.exports = mongoose.model('patient', patientSchema);