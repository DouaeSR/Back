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
