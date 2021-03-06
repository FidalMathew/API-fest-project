const {Router} = require('express')
const { 
    // createUser,
    signupAuth,
    signinAuth,
    logout,
    getCashflow,
    detailsOfUser,
    updateUser } = require('../controllers/userController')
const {checkUser} = require('../middlewares/authMiddlewares')


const router = Router();

// routes for signup and signin
router.post('/signupAuth',signupAuth);
router.post('/signinAuth',signinAuth);
router.patch('/user/:id',updateUser)
// route for logout
router.get('/logout',logout);
//  route for getting all the cashflow
router.get('/cashflow/:userId',checkUser,getCashflow);
router.get('/details/:id',checkUser,detailsOfUser)


module.exports = router;