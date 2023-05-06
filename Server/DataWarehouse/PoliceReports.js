const Mongoose = require('mongoose');

const PoliceReportStucture = Mongoose.Schema(

{
    ID: {type: String, required: true},
    Name: {type: String, required: true},
    Surname: {type: String, required: true},
    DayAndTime: {type: Date, required: true},
    Description: {type: String, required: true},
    ReportNo: {type: String, required: true}
   
}

)

module.exports = Mongoose.model('Police Reports',  PoliceReportStucture);