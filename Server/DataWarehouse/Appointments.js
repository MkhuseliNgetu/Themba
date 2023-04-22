const Mongoose = require('mongoose');

const AppointmentStucture = Mongoose.Schema(

{
    ID: {type: String, required: true},
    Name: {type: String, required: true},
    Surname: {type: String, required: true},
    DayAndTime: {type: Date, required: true},
}

)

module.exports = Mongoose.model('Appointments', AppointmentStucture);