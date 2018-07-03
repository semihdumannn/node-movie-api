const express = require('express');
const router = express.Router();

//Models
const Director = require('../models/Director');

router.get('/', ( req, res ,next ) => {
  
});

router.post('/', ( req, res, next ) => {
  const director = new Director( req.body );

  const promise = director.save();

  promise.then( (data ) => {
     if( !data )
      next( { message :  'Data not found', code : 10});
      
    res.json(data)
  }).catch( ( err ) => {
    res.json( err );
  });
});


module.exports = router;