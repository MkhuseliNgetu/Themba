const express = require('express');
const router = express.Router();

//Cloud Storage
const UserStorage = require('../DataWarehouse/Users')
//Encyption
const Bcrypt = require('bcrypt');
//Authorisation
const JWT = require('jsonwebtoken');

//Addesses
const RegisterCounselors = 'Register'
const LoginCounselors = '/Login'

//Security 
var ThembaProtection = require('express-brute');
var ThembaDataWarehouse = new ThembaProtection.MemoryStore();
var ThembaDDOSProtect = new ThembaProtection(ThembaDataWarehouse);

//Registration - Counselors
router.post(RegisterCounselors, async(req,res, next)=>{

ThembaDDOSProtect.prevent;

    const RoundsOfSalt = 10;

    var ScrambledPasscode = await Bcrypt.hash(req.body.Passcode,RoundsOfSalt);

    const NewCounselor = new UserStorage({Username: req.body.Username, Passcode: ScrambledPasscode });

    var IndexedCounselor = await UserStorage.findOne({Username: req.body.Username}).exec();

    if(IndexedCounselor){

        res.status(409).json({Message: 'Error: Registration Failed: This user already exists'});
    }else{

       NewCounselor.save().then(()=>{
            res.status(201).json({Message: 'Registration successful.'});
           
        })
    }
});

//Login - Counselors
router.post(LoginCounselors, async(req,res)=>{

ThembaDDOSProtect.prevent;

let existingcounselor

  var IndexedCounselor = await UserStorage.findOne({Username: req.body.Username}).then(ExistingUser=>{

        if(ExistingUser){
           
            return res.status(401).json({Message: 'Authentication failed.'});
        }else{

            
            existingcounselor = ExistingUser;
            return Bcrypt.compare(req.body.Passcode,existingcounselor.Passcode)
        }
        
    }).then(result=>{


        if(!result){

            res.status(401).json({Message: 'Error: Login unsuccessful' + "\n"+ 'Incorrect username/password'});
        }else{

            const AuthToken = JWT.sign({Username: existingcounselor.Username, ID: existingcounselor._id}, "Themba Certified Counselor", {expiresIn: '2h'});
            res.status(200).json({Message: 'Login Successful!', Token: AuthToken, AuthenicatedUser: existingcounselor.Username});
        }

    }).catch(err=>{

        return res.status(401).json({Message: 'Error: Login unsuccessful' + "\n"+ 'Incorrect username/password'});

    });

});


    

module.exports = router;