const Doctor = require('../../models/doctorModel');

exports.getDoctors = (req, res, next) => { 
     Doctor.find()
    .then(doctors=> res.status(200).json(doctors))
    .catch(error => res.status(400).json({error}))
  };

  exports.getSingleDoctor = (req, res, next) => { 
    Doctor.findById(req.params.id)
   .then(singledoctor => res.status(200).json(singledoctor))
   .catch(error => res.status(400).json({error}))

 };


    exports.searchDoctor = async (req, res, next) => {

    const { name } = req.body;
    const searchQuery = name.split(' ').map(part => ({ $or: [{ firstName: new RegExp(part, 'i') }, { lastName: new RegExp(part, 'i') }] }));
  
    try {
      const doctors = await Doctor.find({ $and: searchQuery });
      if (doctors.length > 0) {
        res.json(doctors);
      } else {
        res.status(404).json({ message: 'Doctor not found' });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
