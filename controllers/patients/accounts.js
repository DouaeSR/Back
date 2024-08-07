 const Patient = require('../../models/patientModel');
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
 

require('dotenv').config();


exports.signup = (req, res, next) => {
    
    bcrypt.hash(req.body.password, 10)     
    .then(hash => {
        const {firstname,lastname,birthday,gender,email,phone,bloodType,allergies} = req.body
        const patient = new Patient({
          firstName: firstname,
          lastName: lastname,
          birthday: birthday,
          phone:phone,
          bloodType:bloodType,
          allergies:allergies,
          gender: gender,
          email: email.toLowerCase(),
          password: hash,
        });
       
        
        //console.log(patient.email);
        patient.save()
                .then(() => {
                    const token = jwt.sign(
                        { 
                            email: patient.email,
                            userId: patient._id,
                            Type : "Patient"

                        },
                        process.env.SECRET, // Ensure you have this environment variable set
                        { expiresIn: '24h' }
                    );
                    res.status(200).json({
                        Type: 'Patient',
                        user:patient,
                        token: token
                    });
                })
                
                .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const patient = await Patient.findOne({ email });
        if (!patient) {
            return res.status(401).json({ message: 'Auth failed' });
        }

        const isPasswordValid = await bcrypt.compare(password, patient.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Auth failed' });
        }

        const token = jwt.sign(
            {
                email: patient.email,
                userId: patient._id,
                Type : "Patient"
            },
            process.env.SECRET,
            {
                expiresIn: '24h' 
            }
        );

        res.status(200).json({
            Type: 'Patient',
            user:patient,
            token: token
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

