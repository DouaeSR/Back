const Appointment = require('../../models/appointmentModel');



 exports.addAppointment = (req, res, next) => { 
    console.log('addAppointment')
    console.log(req.body)
    const appointment = new Appointment({
        IdDoctor: 0,
        IdPatient: req.auth.userId,
       date: req.body.date
      });

    appointment.save()
      .then(() => {
         res.status(201).json({ message: 'Apointement has been add', appointment });
     })
     .catch(error => res.status(400).json({ error }));
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