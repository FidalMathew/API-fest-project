const mongoose = require('mongoose');
bcrypt = require('bcrypt');
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique : true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
    },
    balance: {
        type: Number,
    },
    credit: {
        type: Number,
    },
    debit: {
        type: Number,
    },
    targetIncome: {
        type: Number,
    },
    targetSavings: {
        type: Number,
    }
});

// hashing passwords before it gets created in database
// through mongoose pre save middleware

userSchema.pre('save', async function(next) {
    // generating salt to hash password
    const salt = await bcrypt.genSalt();
    // hashing password  with the salt generated
    this.password = await bcrypt.hash(this.password,salt);
    next();
});

// custom middleware for login for checking email and 
// password and return the json data

userSchema.statics.login = async function(email,password) {
    // finding user with this email
    const user = await this.findOne({email});
    // check if the user exists or not 
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        // checking if the authentication is successful or not
        if(auth){
            // if authentication successful than return the user
            return user;
        }
        // else throw error
        throw Error('Invalid password');
    }
    throw Error('Invalid email');
}

module.exports = mongoose.model('user', userSchema);