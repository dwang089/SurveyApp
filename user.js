const mongoose = require('mongoose');

//const Schema = mongoose.Schema;
const { Schema } = mongoose;

const user = new Schema({
  googleID: String
});

mongoose.model('users', user);