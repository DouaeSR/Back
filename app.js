const express = require('express');

const mongoose= require('mongoose')
require('dotenv').config()
const patientsRoutes =require('./routes/patients/account')
const doctorsRoutes =require('./routes/doctors/account')
const appointmentsRoutes = require('./routes/patients/appointments');
const listRoutes = require('./routes/patients/doctors')
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
app.use('/api/doctors', doctorsRoutes);
app.use('/api/appointments', appointmentsRoutes);

module.exports = app;