// const User = require('../models/User');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

require('dotenv').config();
const patient  =require('../../models/patientModel')
//signup patient
const signupPatient = async (req, res) => {
    const {email,password}= req.body
    try{
        const patient= await patient.signup(email,password)
        res.status(200).json({email,password})

    } catch(error) {
        res.status(400).json({error: error.message})

    }

    res.json({mssg:'user sign up'})
}
//login patient
const loginPatient = async(req, res) => {

    res.json({mssg:'user log in'})
}


module.exports = {signupPatient, loginPatient}