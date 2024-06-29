const Admin = require('../../models/adminModel');
const Patient = require('../../models/patientModel')
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
