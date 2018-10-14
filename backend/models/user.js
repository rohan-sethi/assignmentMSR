const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");

// DB schema, Not Required for demo.

let userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String, 
    paintingUrl: String,
  }
)

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);