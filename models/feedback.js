
const mongoose = require('mongoose');

const feedbackschema = new mongoose.Schema({

email: String,
password: String,
})


module.exports = mongoose.model('feedback',feedbackschema)