 const Patient = require('../../models/patientModel');
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
 

require('dotenv').config();


exports.signup = (req, res, next) => {
    // console.log(req.body.email)
    // console.log(req.body.firstName)
    // console.log(req.body.lastName)
    // console.log(req.body.birthday)
    // console.log(req.body.gender)
    bcrypt.hash(req.body.password, 10)     // 10 = nbr de tour d'algorythme
    .then(hash => {
        const {firstname,lastname,birthday,gender,email} = req.body
        const patient = new Patient({
          firstName: firstname,
          lastName: lastname,
          birthday: birthday,
          gender: gender,
          email: email.toLowerCase(),
          password: hash,
        });
       
        
        //console.log(patient.email);
         patient.save()
         .then(() => {

            res.status(201).json({ message: 'Utilisateur créé !', patient });
        })
        .catch(error => res.status(400).json({ error }));
})
.catch(error => res.status(500).json({ error }))
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
                userId: patient._id
            },
            process.env.SECRET,
            {
                expiresIn: '1h' 
            }
        );

        res.status(200).json({
            message: 'Auth successful',
            token: token
        });
    } catch (error) {
        res.status(500).json({ error });
    }
};

