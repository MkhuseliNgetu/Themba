const Mongoose = require('mongoose');

const CounselorsStucture = Mongoose.Schema(

{
    Username: {type: String, required: true},
    Password: {type: Date, required: true}
}

)

module.exports = Mongoose.model('Counselors', CounselorsStucture);