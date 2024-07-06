const mongoose = require("mongoose");
 
const appointmentSchema = mongoose.Schema({
  IdDoctor: {
    type: mongoose.Types.ObjectId,
    ref: "doctor",
    required: true,
  },
  IdPatient: {
    type: mongoose.Types.ObjectId,
    ref: "patient",
    required: true,
  },
  date: { type: Date, required: true },
  
  status: {
    type: String,
    enum: ["pending", "done", "canceled"],
    default: "pending",
  },
  
});

module.exports = mongoose.model("appointment", appointmentSchema);
