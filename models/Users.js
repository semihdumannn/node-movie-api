const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username : {
    type: String,
    maxlength : 60,
    minlength : 2,
    required : true,
    unique : true
  },
  password : {
    type:String,
    minlength :5,
  },
  createdAt : {
    type:Date,
    default : Date.now
  }
});

module.exports = mongoose.model('user',UserSchema);