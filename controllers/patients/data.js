const Patient = require('../../models/patientModel');

exports.getPatientData = (req, res, next) => {
  Patient.findById(req.auth.userId)
    .then(patient => {
      if (!patient) {
        return res.status(404).json({ error: 'Patient not found' });
      }
      res.status(200).json(patient);
    })
    .catch(error => res.status(500).json({ error }));
};
exports.updatePatientData = async (req, res, next) => {
  const { firstName,lastName,email,phone,bloodType,allergies} = req.body;

  try {
    const patient = await Patient.findById(req.auth.userId);

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    patient.firstName = firstName;
    patient.lastName = lastName;
    // patient.cin = cin;
    patient.bloodType = bloodType;
    patient.allergies = allergies;
    patient.phone = phone;
    patient.email = email;

    await patient.save();

    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};