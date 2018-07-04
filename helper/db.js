const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://movie_user:Semih1453@ds125331.mlab.com:25331/movie-api')
  .then(()=>{
   // console.log('MongoDb bağlantısı sağlandı');
  })
  .catch((err)=>{
    console.log('Bağlantı Hatası : ',err);
  });

  mongoose.Promise = global.Promise;
  
   
};