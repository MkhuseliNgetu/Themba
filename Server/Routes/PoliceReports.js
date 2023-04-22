const Express = require('express')
const Router = Express.Router();

//Cloud Storage
const UserStorage = require('../DataWarehouse/PoliceReports')
//Addesses
const FilePoliceReport  = '/Report'
const Controller = '/Themba'

//Patient - Filing A Police Report 
Router.post(Controller+FilePoliceReport, function(res,req){


})
