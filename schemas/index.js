const hidden = require('../config/dev')
const mongoose = require("mongoose");

const connect = () => {
    if (process.env.Node_ENV !== 'production') {
        mongoose.set('debug', true);
    }

    mongoose.connect(hidden.mongoURI, {
    useNewUrlParser: true, useUnifiedTopology: true, dbName:'test2'
    }).then (() => console.log("MongoDB connected...")).catch(err => console.log(err))
}

mongoose.connection.on('error', (error) => {
    console.error('mongoDB connection error', error)
});

mongoose.connection.on('disconnected', () => {
    console.error("Disconnected. try reconnect");
    connect();
})

module.exports = connect;