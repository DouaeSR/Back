const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/adminModel');
const Doctor = require('../../models/doctorModel');
const Patient = require('../../models/patientModel');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Try to find the user in the Admin collection
        let user = await Admin.findOne({ email });
        let userType = "Admin";

        if (!user) {
            // Try to find the user in the Doctor collection
            user = await Doctor.findOne({ email });
            userType = "Doctor";
        }

        if (!user) {
            // Try to find the user in the Patient collection
            user = await Patient.findOne({ email });
            userType = "Patient";
        }

        // If no user is found, return an authentication failure response
        if (!user) {
            return res.status(401).json({ message: 'Auth failed' });
        }

        // Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Auth failed' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            {
                email: user.email,
                userId: user._id,
                Type: userType
            },
            process.env.SECRET,
            {
                expiresIn: '24h'
            }
        );

        // Return the response with the token and user type
        res.status(200).json({
            Type: userType,
            user: user,
            token: token
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};