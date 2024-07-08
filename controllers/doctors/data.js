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

  exports.updateDoctorData = async (req, res, next) => {
    const {email,phone,address,education,experience} = req.body;
  
    try {
      const doctor = await Doctor.findById(req.auth.userId);
  
      if (!doctor) {
        return res.status(404).json({ message: 'Patient not found' });
      }
      // patient.cin = cin;
      doctor.address = address;
      doctor.education = education;
      doctor.phone = phone;
      doctor.email = email;
      doctor.experience = experience;
  
      await doctor.save();
  
      res.json(doctor);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  