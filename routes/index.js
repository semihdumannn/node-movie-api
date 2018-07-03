const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Models
const User = require('../models/Users.js');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/register', (req, res, next) => {
  const { username , password} = req.body;

  bcrypt.hash(password, 10).then( ( hash) =>{
 // Store hash in your password DB.

  const user = new User({
    username,
    password :hash
  });

  const promise = user.save();

  promise.then( ( data) => {
    res.json(data);
  }).catch( ( err ) => {
    res.json(err);
  });
  });
   
});

router.post('/authtenticate', ( req, res) => {
  const { username,password } = req.body;

  User.findOne({
    username
  }, (err ,user ) => {
    if(err)
      throw err;
    
      if(!user){
        res.json({status : false,message : 'Authtentication failed user not found'});
      }else{
        bcrypt.compare(password, user.password).then( ( result) => {
          if(!result){
            res.json({
              status :false,
              message : 'Authentication failed ,wrong password'
            });
          }else {
            const payload = {
              username ,
            };
            const token = jwt.sign(payload,req.app.get('api_secret_key'),{
              expiresIn : 720 // dk cinsinden ifadedir
            });

            res.json({
              status :true,
              token
            });
          }
        });
      }

  });
});

module.exports = router;
