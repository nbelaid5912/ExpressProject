const mongoose = require('mongoose');

//Customer 
const CustomerSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    pwd: {
        type: String,
        required: true
    }
});

const Customer = mongoose.model('Customer', CustomerSchema,'users'  /* <-- nom de la collection */);

module.exports = { Customer:Customer };
