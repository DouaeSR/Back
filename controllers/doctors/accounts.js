const Doctor = require('../../models/doctorModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 

require('dotenv').config();


exports.signup = (req, res, next) => {
    
    bcrypt.hash(req.body.password, 10)    
    .then(hash => {
        const {firstName,lastName,specialization,gender,email} = req.body
        const doctor = new Doctor({
          firstName: firstName,
          lastName: lastName,
          specialization : specialization,
          gender: gender,
          email: email.toLowerCase(),
          password: hash,
        });
       
        
        //console.log(patient.email);
         doctor.save()
         .then(() => {
            const token = jwt.sign(
                {
                    email: doctor.email,
                    userId: doctor._id,
                    Type : "Doctor"
                },
                process.env.SECRET,
                {
                    expiresIn: '1h' 
                }
            );
    
            res.status(200).json({
                Type: 'Doctor',
                user:doctor,
                token: token
            });
        })
        .catch(error => res.status(400).json({ error }));
})
.catch(error => res.status(500).json({ error }))
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(401).json({ message: 'Auth failed' });
        }

        const isPasswordValid = await bcrypt.compare(password, doctor.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Auth failed' });
        }

        const token = jwt.sign(
            {
                email: doctor.email,
                userId: doctor._id,
                Type : "Doctor"
            },
            process.env.SECRET,
            {
                expiresIn: '24h' 
            }
        );

        res.status(200).json({
            Type: 'Doctor',
            user:doctor,
            token: token
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

