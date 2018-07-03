const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  director_id : Schema.Types.ObjectId,
  title : {
    type : String,
    required : [true,'`{PATH}` alanı zorunludur.'],
    maxlength :[150, '`{PATH}` alanına maksimum `{MAXLENGTH}` karakter giriniz. '],
    minlength : [5 , '`{PATH}` alanına minimum `{MINLENGTH}` karakter giriniz.']
  },
  category : {
    type : String,
    maxlength :[150, '`{PATH}` alanına maksimum `{MAXLENGTH}` karakter giriniz. '],
    minlength : [5 , '`{PATH}` alanına minimum `{MINLENGTH}` karakter giriniz.']
  },
  country : {
    type:String,
    maxlength :[150, '`{PATH}` alanına maksimum `{MAXLENGTH}` karakter giriniz. '],
    minlength : [5 , '`{PATH}` alanına minimum `{MINLENGTH}` karakter giriniz.']

  },
  year : {
    type : Number,
    max :2040,
    min:1900
  },
  imdb_score : {
    type:Number,
    max :10,
    min: 0
  },
  createdAt : {
    type : Date,
    default : Date.now
  }
});


module.exports = mongoose.model('movie',MovieSchema);