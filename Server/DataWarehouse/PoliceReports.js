const Mongoose = require('mongoose');

const PoliceReportStucture = Mongoose.Schema(

{
    ID: {type: String, required: true},
    Name: {type: String, required: true},
    Surname: {type: String, required: true},
    DayAndTime: {type: Date, required: true},
    Description: {type: String, required: true}
    //OfficerSignature: {type: Image, required: false} //For now (Beta Phase), its not required.
}

)

module.exports = Mongoose.model('Police Reports',  PoliceReportStucture);