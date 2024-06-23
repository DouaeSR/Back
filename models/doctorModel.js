const mongoose = require("mongoose");

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

  specialization: { 
    type: String,
    required: true,
  },

  experiences: {
    type: Array,
  },

  bio: { type: String, maxLength: 50 },
 
  schedual: { type: Array },

  Rating: {
    type: Number,
    default: 0,
  },
  
  // appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
});

module.exports = mongoose.model("doctor", doctorSchema);