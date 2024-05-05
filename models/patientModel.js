const mongoose=  require('mongoose')
const bcrypt =require('bcrypt')

const Schema = mongoose.Schema


const patientSchema = new Schema({
   
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        
    },
   
})
 patientSchema.statics.signup = async function( email, password) {
    const exist = await this.findOne({email}) 

    if (exist) {
        throw Error('email already in use')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const patient = await this.create({email,password: hash})

    return patient
 }


module.exports = mongoose.model('patient', patientSchema)