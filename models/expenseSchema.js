const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    typeOfOp : {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'users'
    },
    category: {
        type: String,
        required: true
    },
    mode: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('expense', expenseSchema);