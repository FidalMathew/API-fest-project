const jwt = require('jsonwebtoken');
const User = require('../models/userSchema')
const Income = require('../models/incomeSchema')
const Expense = require('../models/expenseSchema')
const maxAge = 3 * 24 * 60 * 60;

// custom function for creating token
const createToken = (id) => {
    // create JWT token and returning
    return jwt.sign({id},process.env.JWT_SECRET,{expiresIn : maxAge})
}

// custom function for error login/ signup handling

const handleError = (err) => {
    // initialize demo error objects
    let errors = {succes:'false' ,email: '', password: '' };
    if (err.message === 'Invalid password') {
        // check if invalid password
        // and set the error message to the error object
        errors.password = 'Invalid password'
    }
    if (err.message === 'Invalid email') {
        // check if invalid email
        // and set the error message to the error object
        errors.email = 'Invalid email'
    }
    if (err.code === 11000 && ['email'] in err.keyValue) {
        // check email already exists and set the error message
        errors.email = 'Email already exists'
        return errors
    }
    if (err.message.includes('user validation failed')) {
        // check for user validation
        Object.values(err.errors).forEach(({ properties }) => {
            // console.log(properties);
            errors[properties.path] = properties.message;
        });
    }
    return errors
}


// controller for normal user signup
const signupAuth = async (req, res) => {
    try {
        // check for empty req body or not
        if(Object.keys(req.body)){
            req.body.balance =0
            req.body.credit =0
            req.body.debit =0
            req.body.targetIncome =0
            req.body.targetSavings =0
            const body = req.body;
            // create user
            const user = await User.create(body);
            // create JWT token with user id
            const token = createToken(user._id);
            // setting up the cookie
            res.cookie('JWTtoken', token, {httpOnly: true, maxAge: maxAge*1000});
            // returning response
            res.status(201).json({
                _id : user._id,
                name: user.name,
                email: user.email
            })
        }else{
            // return response if empty req body
            res.status(204).json({
                message: "Empty body"
            })
        }
    } catch (err) {
        const error = handleError(err);
        res.status(400).json({ error});
    }
};

// controller for normal user signin
const signinAuth = async (req, res) => {
    try {
        // checking for req body is empty or not
        if(Object.keys(req.body)){
            const {email, password} = req.body;
            // logging in via mongoose custom middleware
            const user = await User.login(email,password);
            // creating the JWT token
            const token = createToken(user._id);
            // setting cookie
            res.cookie('JWTtoken',token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).json({
                _id : user._id,
                name: user.name,
                email: user.email,
                balance: user.balance,
                credit: user.credit,
                debit: user.debit,
                targetSavings : user.targetSavings,
                targetIncome: user.targetIncome,
                token
            });
        }else{
            // return response if req body is empty
            res.status(204).json({
                message: "Empty body"
            })
        }
        
    } catch (err) {
        // throwing error object to custom error handling function
        const error = handleError(err)
        // return custom error object in response
        res.status(400).json({ error });
    }

};


//  controller for normal login's logout
const logout = async (req, res) => {
    try {
        // clearing the cookies from the browser
        res.cookie('JWTtoken','',{ maxAge: 1});
        res.status(200).redirect('/');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


const getCashflow = async (req, res) => {
    try {
        let cashflow = []
        // find all income by user id
        const income = await Income.find({
            userId: req.params.userId
        })
        // find all expense by user id
        const expense = await Expense.find({
            userId: req.params.userId
        })
        // pushing into the cashflow array
        cashflow.push(...income)
        cashflow.push(...expense)
        // sorting according to the time stamps
        cashflow.sort((x, y) =>{
            return x.createdAt - y.createdAt;
        })
        // send response
        res.status(200).json(cashflow)
    } catch (error) {
        res.status(500).json(error)
    }
}

const detailsOfUser = async (req, res) => {
    try {
        let cashflow = []
        // find the user by _id
        const user = await User.findById(req.params.id).select('-password')
        // find all income by user id
        const income = await Income.find({
            userId: req.params.id
        })
        // find all expense by user id
        const expense = await Expense.find({
            userId: req.params.id
        })
        // pushing into the cashflow array
        cashflow.push(...income)
        cashflow.push(...expense)
        // sorting according to the time stamps
        cashflow.sort((x, y) =>{
            return x.createdAt - y.createdAt;
        })
        // send response
        res.status(200).json({user,cashflow})
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body)
        res.status(204).json()
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports= {
    updateUser,
    signupAuth,
    signinAuth,
    logout,
    getCashflow,
    detailsOfUser
}
