const Admin = require('../../models/adminModel');
const Patient = require('../../models/patientModel')
const Doctor = require('../../models/doctorModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 

require('dotenv').config();


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Auth failed' });
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Auth failed' });
        }

        const token = jwt.sign(
            {
                email: admin.email,
                userId: admin._id,
                Type : "Admin"
            },
            process.env.SECRET,
            {
                expiresIn: '24h' 
            }
        );

        res.status(200).json({
            Type: 'Admin',
            user:admin,
            token: token
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.getAllPatients = async (req, res) => {
    try {
      const patients = await Patient.find();
      res.status(200).json(patients);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching patients.' });
    }
  };

exports.getNewDoctors = async (req, res) => {
    try {
      const newDoctors = await Doctor.find({ status: 'pending' });
      res.status(200).json(newDoctors);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching pending doctors.' });
    }
  };
  exports.approveDoctor = async (req, res) => {
    try {
      const doctorId = req.params.id;
      const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, { status: 'approved' }, { new: true });
      res.status(200).json(updatedDoctor);
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while approving the doctor.' });
    }
  };
  
  exports.deleteDoctor = async (req, res) => {
    try {
      const doctorId = req.params.id;
      await Doctor.findByIdAndDelete(doctorId);
      res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the doctor.' });
    }
  };
  exports.deletePatient = async (req, res) => {
    try {
      const patientId = req.params.id;
      await Patient.findByIdAndDelete(patientId);
      res.status(200).json({ message: 'patient deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while deleting the patient.' });
    }
  };