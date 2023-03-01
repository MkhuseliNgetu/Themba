const Express = require('express')
const Router = Express.Router();

//Cloud Storage
const AppointmentStorage = require('../DataWarehouse/Appointments')
//Addesses
const AttendSession = '/Session'


Router.post(AttendSession, (res,req)=>{


})

module.exports = Router;