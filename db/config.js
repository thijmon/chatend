const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:dikkeboktor@cluster0.fdm4m.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true });



const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('we in boys')
});