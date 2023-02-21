const Express = require('express')
const Router = Express.Router();

//Cloud Storage
const UserStorage = require('../DataWarehouse/Appointments')
//Addesses
const AttendSession = '/Session'
const Controller = '/Themba'

//Patient - Filing A Police Report 
Router.post(AttendSession, function(res,req){


})

module.exports = Router;