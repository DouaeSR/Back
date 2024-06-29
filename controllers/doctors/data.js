const Doctor = require('../../models/doctorModel');

exports.getDoctorsData = (req, res, next) => {
    Doctor.findById(req.auth.userId)
      .then(doctor => {
        if (!doctor) {
          return res.status(404).json({ error: 'Doctor not found' });
        }
        res.status(200).json(doctor);
      })
      .catch(error => res.status(500).json({ error }));
  };
  