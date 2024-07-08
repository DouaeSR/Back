const express = require('express');

const mongoose= require('mongoose')
require('dotenv').config()
const patientsRoutes =require('./routes/patients/account')
const doctorsRoutes =require('./routes/doctors/account')
const adminRoutes =require('./routes/admin/accounts')
const appointmentsRoutes = require('./routes/patients/appointments');
const listRoutes = require('./routes/patients/doctors')
const dataRoutes = require('./routes/doctors/patients')
const PatientDataRoutes = require ('./routes/patients/data')
const DoctorsDataRoutes = require ('./routes/doctors/data')
const UsersRoutes = require ('./routes/login')
const MessagesRoutes =require ('./routes/contact')

mongoose.connect(`${process.env.MONGOOSE}`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


const app = express();
app.use(express.json())

app.use((req, res, next) => {
    // console.log(req.body)
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use('/api/patients', patientsRoutes );
app.use('/api/patients', listRoutes);
app.use('/api/patients', PatientDataRoutes);
app.use('/api/admin', adminRoutes );
app.use('/api/doctors', doctorsRoutes);
app.use('/api/doctors', DoctorsDataRoutes);
app.use('/api/doctors', dataRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/users', UsersRoutes );
app.use('/api/messages', MessagesRoutes );

module.exports = app;