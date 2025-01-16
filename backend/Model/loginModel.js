const mongoose = require('mongoose');


const singupSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

});

const signupModel = new mongoose.model('singup', singupSchema);

module.exports = signupModel;


