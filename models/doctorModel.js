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
  phone: { 
    type: Number 
  },
  photo: { 
    type: String 
  },

  adress: { 
    type: String 
  },
  education: { 
    type: String 
  },

  specialization: { 
    type: String,
    required: true,
  },

  experiences: {
    type: Array,
  },
 
  schedual: { type: Object },

  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
  },
});
doctorSchema.plugin(uniqueValidator);

module.exports = mongoose.model("doctor", doctorSchema);