const Mongoose = require('mongoose');

const CounselorsStucture = Mongoose.Schema(

{
    Username: {type: String, required: true},
    Passcode: {type: String, required: true}
}

)

module.exports = Mongoose.model('Counselors', CounselorsStucture);