const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const patientSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthday: { type: Date },
  gender: { type: String, enum: ["male", "female"] },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: {type: Number,},
  bloodType:{type: String, enum: ["O+", "O-","A+","A-","B+","B-","AB+","AB-"]},
  allergies:{type: String},
  
  cancellationCount: {
    type: Number,
    default: 0
  },
  lastCancellationDate: {
    type: Date,
    default: null
  }
});

patientSchema.plugin(uniqueValidator);

module.exports = mongoose.model("patient", patientSchema);
