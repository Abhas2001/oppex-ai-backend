
const mongoose = require('mongoose');

const feedbackschema = new mongoose.Schema({

name: String,
message: String,
})


module.exports = mongoose.model('feedback',feedbackschema)