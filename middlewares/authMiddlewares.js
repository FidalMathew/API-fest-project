const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');


const checkUser = (req, res,next) => {
    try {
        var c ;
        const token = req.headers.authorization.split(' ')[1];
        if(token){
            jwt.verify(token,process.env.JWT_SECRET,async (err, decodedToken) => {
                if(err) {
                    res.status(401).json({message : "Auth failed"})
                }else{
                    // find the user by the id
                    const user = await User.findById(decodedToken.id);
                    // console.log(user);
                    if(user){
                        next();
                    }else{
                        // else authentication not successful
                        // res.redirect('/api/signupAuth');
                        res.status(401).json({message : "Auth failed"})
                    }
                }
            });
        }else{
            // code for redirection if user is not logged includes
            // res.redirect('/api/signupAuth');
            res.status(401).json({message : "Auth failed"})
        }
    } catch (error) {
        res.status(401).json({ message : "Auth failed"});
    }
};

module.exports = {
    checkUser
};