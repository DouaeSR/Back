const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
  IdDoctor: {
    type: String,
    ref: "Doctor",
    required: true,
  },
  IdPatient: {
    type: mongoose.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  date: { type: Date, required: true },
  
  status: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
});

module.exports = mongoose.model("appointment", appointmentSchema);
