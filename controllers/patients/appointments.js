const Appointment = require('../../models/appointmentModel');



 exports.addAppointment = async (req, res, next) => { 
    console.log('addAppointment')
    console.log(req.body)
    // const appointment = new Appointment({
    //     IdDoctor: req.body.IdDoctor,
    //     IdPatient: req.body.IdPatient,
    //     date: req.body.date
    //   });
    console.log('addAppointment');
    console.log(req.body);

    const { IdDoctor, IdPatient, date } = req.body;
    const appointmentDate = new Date(date);

    const appointment = new Appointment({
        IdDoctor,
        IdPatient,
        date: appointmentDate
    });

    try {
        await appointment.save();
        res.status(201).json({ message: 'Appointment has been added', appointment });
    } catch (error) {
        res.status(500).json({ error });
    }
};

 exports.getAppointmentPatient = (req, res, next) => { 
   Appointment.find({IdPatient:req.auth.userId})
    .then(appointments => res.status(200).json(appointments))
    .catch(error => res.status(400).json({error}))
 };

 exports.getAppointmentDoctor = (req, res, next) => { 
    console.log('postTest')
    res.status(200).json({
        userId: req.auth.userId,
        Type:req.auth.userType,
    });
 };

 exports.getSingleAppointment = (req, res, next) => { 
    console.log('postTest')
    res.status(200).json({
        userId: req.auth.userId,
        Type:req.auth.userType,
    });
 };

 exports.updateStatus = (req, res, next) => { 
    console.log('postTest')
    res.status(200).json({
        userId: req.auth.userId,
        Type:req.auth.userType,
    });
 };
 exports.getNumberOfAppointments = async (req, res, next) =>{
    try {
      const { doctorId, date } = req.body;

      // Count the number of appointments for the given doctor and date
      const count = await Appointment.countDocuments({
          IdDoctor: doctorId,
          date: new Date(date).setHours(0, 0, 0, 0) // Normalize date to ignore time
      });

      res.status(200).json({ count });
  } catch (error) {
      res.status(500).json({ error: 'Error fetching appointment count' });
  }
  }

  