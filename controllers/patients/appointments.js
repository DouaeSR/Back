const Appointment = require('../../models/appointmentModel');
const Patient = require('../../models/patientModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;




exports.addAppointment = async (req, res, next) => { 
    console.log('addAppointment');
    console.log(req.body);

    const { IdDoctor, IdPatient, date } = req.body;
    const appointmentDate = new Date(date); 
    // appointmentDate.setDate(appointmentDate.getDate() + 1);
  

    try {
        
        const existingAppointment = await Appointment.findOne({
            IdDoctor,
            IdPatient,
            date: appointmentDate
        });

        if (existingAppointment) {
            return res.status(400).json({ message: 'You already have an appointment with this doctor on this date' });
        }

      
        const count = await Appointment.countDocuments({
            IdDoctor,
            date: appointmentDate
        });

        if (count >= 4) {
            return res.status(400).json({ message: 'No more appointments available for this date' });
        }

        const appointment = new Appointment({
            IdDoctor,
            IdPatient,
            date: appointmentDate
        });

        await appointment.save();
        res.status(201).json({ message: 'Appointment has been added', appointment });
    } catch (error) {
        res.status(500).json({ error });
    }
};


exports.getAppointmentPatient = (req, res, next) => { 
    Appointment.find({ IdPatient: req.auth.userId })
      .populate('IdDoctor', 'lastName specialization firstName') 
      .then(appointments => res.status(200).json(appointments))
      .catch(error => res.status(400).json({ error }));
  };

 exports.getAppointmentDoctor = (req, res, next) => { 
    Appointment.find({IdDoctor:req.auth.userId})
    .populate('IdPatient', ' firstName lastName specialization') 
    .then(appointments => res.status(200).json(appointments))
    .catch(error => res.status(400).json({error}))
 };

 exports.cancelAppointmentDoctor = async (req, res,next) => {
    const { appointmentId } = req.body;
    
    try {
     
      await Appointment.findByIdAndUpdate(appointmentId, {  status: 'canceled' }, { new: true });
      res.status(200).send({ message: 'Appointment canceled' });
    } catch (error) {
      res.status(500).send({ message: 'Failed to cancel appointment' });
    }
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
  };
 
exports.cancelAppointment = async (req, res,next) => {
  const { appointmentId, IdPatient } = req.body;
console.log(IdPatient)
console.log(appointmentId)
  try {
    const patient = await Patient.findById(IdPatient);
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    if (patient.lastCancellationDate) {
      const lastCancellationDate = new Date(patient.lastCancellationDate);
      if (lastCancellationDate.getMonth() === currentMonth && lastCancellationDate.getFullYear() === currentYear) {
        if (patient.cancellationCount >= 3) {
          return res.status(400).json({ message: 'You have already used all your cancellation rights for this month' });
        }
      } else {
        patient.cancellationCount = 0;
      }
    }

    await Appointment.findByIdAndUpdate(appointmentId, {  status: 'canceled' }, { new: true });
    patient.cancellationCount += 1;
    patient.lastCancellationDate = new Date();
    await patient.save();

    res.status(200).json({ message: 'Appointment canceled successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.getAppointmentsCountByDate = async (req, res, next) => {
  const doctorId = new ObjectId(req.body.IdDoctor);
  try {
  const response = await Appointment.aggregate([
    {
      $match: { IdDoctor: doctorId }
    },
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          day: { $dayOfMonth: "$date" },
          IdDoctor : "$IdDoctor"
          
        },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 }
    }
  ]);

  // console.log(response)

  res.json(response);
} catch (err) {
  console.error(err);
  res.status(500).send(err);
}


 
};

exports.updateTime = async (req, res,next) => {
  const { appointmentId } = req.params;
  const { time } = req.body;

  try {
    // Find the appointment by ID and update the time
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { $set: { time } },
      { new: true } // Return the updated document
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    console.error('Error updating appointment time:', error);
    res.status(500).json({ message: 'Failed to update appointment time' });
  }
};
