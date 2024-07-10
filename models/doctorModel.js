const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');
const doctorSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  gender: { type: String, enum: ["male", "female"] },
  phone: { 
    type: Number 
  },
  photo: { 
    type: String 
  },

  address: { 
    type: String 
  },
  education: { 
    type: String 
  },

  specialization: { 
    type: String,
    required: true,
  },

  experience: {
    type: String 
  },
 
  schedule: { type: Object },

  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
  },
});
doctorSchema.plugin(uniqueValidator);

module.exports = mongoose.model("doctor", doctorSchema);