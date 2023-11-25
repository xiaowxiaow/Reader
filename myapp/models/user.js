var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    first_name: { type: String, required: true, max: 100 },
    family_name: { type: String, required: true, max: 100 },
    email: { type: String, required: true },
    password: { type: String, required: true },
    identity: { type: String, required: true },
  }
);

//Export model
module.exports = mongoose.model('User', UserSchema);
