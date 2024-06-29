const Patient = require('../../models/patientModel');
const Appointment = require('../../models/appointmentModel');

exports.getSinglePatient = (req, res, next) => { 
    Patient.findById(req.params.id)
   .then(singlepatient => res.status(200).json(singlepatient))
   .catch(error => res.status(400).json({error}))

 };
 
exports.getPatientsForDoctor = async (req, res) => {
  try {
    const doctorId = req.auth.userId;
    console.log(doctorId)
    const appointments = await Appointment.find({ IdDoctor: doctorId }).populate('IdPatient');
    const patients = appointments.map(appointment => appointment.IdPatient);
    // Removing duplicates
    const uniquePatients = [...new Map(patients.map(patient => [patient._id.toString(), patient])).values()];
    res.status(200).json(uniquePatients);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching patients.' });
  }
};
exports.getTodaysAppointments = async (req, res) => {
  try {
    const doctorId = req.auth.userId;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const appointments = await Appointment.find({
      IdDoctor: doctorId,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
      }
    }).populate('IdPatient', 'firstName lastName');

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching today\'s appointments.' });
  }
};