const Express = require('express')
const Router = Express.Router();

//Cloud Storage
const UserStorage = require('../DataWarehouse/Users')
//Encyption
const Bcrypt = require('bcrypt')
//Authorisation
const JWT = require('jsonwebtoken');
const { router } = require('../app');
//Addesses
const RegisterCounselors = '/Register'
const LoginCounselors = '/Login'
const CounselorDashboard = '/Dashboard'
const CounselorAppointmentsUpdate = '/UpdateAppointments'
const Controller = '/Themba'

//Registration - Counselors
Router.post(Controller+RegisterCounselors, function(res,req){




})
//Login - Counselors
Router.post(Controller+RegisterCounselors, function(res,req){



    
})
