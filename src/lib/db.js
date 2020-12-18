const mongoose = require('mongoose');

module.exports = {
  connect: () => {
    mongoose.connect(`mongodb://mongo:${process.env.MONGODB_PORT}/sami`, {
        useNewUrlParser: true,
        authSource: 'admin',
        user: process.env.MONGODB_ADMINUSERNAME,
        pass: process.env.MONGODB_ADMINPASSWORD,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500,
        connectTimeoutMS: 10000,
    });

    var db = mongoose.connection;

    db.once('open', function () {
        console.log('Connected to database');
    });
    
    db.on('error', function (err) {
      console.log('Failed to connect to database', err);
    });
  }
};
