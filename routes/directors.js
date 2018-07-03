const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Models
const Director = require('../models/Director');

router.get('/', ( req, res ,next ) => {
  const promise = Director.aggregate([
  {
    $lookup : {
      from : 'movies' , // eşlenecek collections name
      localField : '_id', // eşlenecek collections da hangi alana gelecekse onu belirtiyoruz
      foreignField : 'director_id', //movies collections da hangi alanala eşlecekse onu belirtiyor
      as : 'movies'
    }

  },
  {
    $unwind : {
      path : '$movies',
      preserveNullAndEmptyArrays : true
    }
  },
  {
    $group : {
      _id : {
        _id : '$_id',
        name : '$name',
        surname : '$surname',
        bio : '$bio'
      },
      movies : {
        $push :'$movies'
      }
    }
  },
  {
    $project : {
      _id : '$_id._id',
      name : '$_id.name',
      surname : '$_id.surname',
      movies :  '$movies'
    }
  }
]);


promise.then( ( data ) => {
  res.json(data);
}).catch( ( err ) => {
  res.json( err );
});

  
});

router.get('/:director_id', ( req, res ,next ) => {
  const promise = Director.aggregate([
  {
    $match : {
      '_id' : mongoose.Types.ObjectId(req.params.director_id) 
    }

  },
  {
    $lookup : {
      from : 'movies' , // eşlenecek collections name
      localField : '_id', // eşlenecek collections da hangi alana gelecekse onu belirtiyoruz
      foreignField : 'director_id', //movies collections da hangi alanala eşlecekse onu belirtiyor
      as : 'movies'
    }

  },
  {
    $unwind : {
      path : '$movies',
      preserveNullAndEmptyArrays : true
    }
  },
  {
    $group : {
      _id : {
        _id : '$_id',
        name : '$name',
        surname : '$surname',
        bio : '$bio'
      },
      movies : {
        $push :'$movies'
      }
    }
  },
  {
    $project : {
      _id : '$_id._id',
      name : '$_id.name',
      surname : '$_id.surname',
      movies :  '$movies'
    }
  }
]);


promise.then( ( data ) => {
  res.json(data);
}).catch( ( err ) => {
  res.json( err );
});

  
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

//güncelleme
router.put('/:director_id', ( req, res, next ) => { 
  const promise = Director.findByIdAndUpdate(
    req.params.director_id,
    req.body,
    {
      new : true
    }
  );

  promise.then(  ( director ) => {
    if ( !director )
      next( { message : 'The movie was not found ',code: 99   } );

    res.json({status : 1});

  }).catch( ( err ) => {
    res.json(err);
  });
});

//silme
router.delete('/:director_id', (req, res ,next ) => { 
  const promise = Director.findByIdAndRemove(req.params.director_id);

  promise.then( (director ) => {
    if ( !director)
      next( { message : 'The movie was not found' , code : 10});

    res.json({status : 1});

  }).catch( ( err ) => {
      res.json( err );
  });
});

 

module.exports = router;