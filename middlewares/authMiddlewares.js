const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');


const checkUser = (req, res,next) => {
    try {
        // get the token from the header
        const token = req.headers.authorization.split(' ')[1];
        if(token){
            // if token exist verify the token
            jwt.verify(token,process.env.JWT_SECRET,async (err, decodedToken) => {
                if(err) {
                    // auth failed if error
                    res.status(401).json({message : "Auth failed"})
                }else{
                    // find the user by the id from the decoded token
                    const user = await User.findById(decodedToken.id);
                    if(user){
                        next();
                    }else{
                        // else authentication not successful
                        res.status(401).json({message : "Auth failed"})
                    }
                }
            });
        }else{
            res.status(401).json({message : "Auth failed"})
        }
    } catch (error) {
        res.status(401).json({ message : "Auth failed"});
    }
};

module.exports = {
    checkUser
};