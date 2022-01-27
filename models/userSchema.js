const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique : true
    },
    balance: {
        type: Number,
        required: true
    },
    credit: {
        type: Number,
    },
    debit: {
        type: Number,
    }
});

module.exports = mongoose.model('user', userSchema);