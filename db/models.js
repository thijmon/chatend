const mongoose = require('mongoose')


const message = new mongoose.Schema({
    username: String,
    message: String,
    room: String
});


const Message = mongoose.model('Message', message);



module.exports.Message = Message