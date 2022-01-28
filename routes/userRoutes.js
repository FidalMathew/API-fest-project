const {Router} = require('express')
const { 
    // createUser,
    signupAuth,
    signinAuth,
    logout,
    getCashflow } = require('../controllers/userController')


const router = Router();

router.post('/signupAuth',signupAuth);
router.post('/signinAuth',signinAuth);
// router.patch('/user/:id',createUser)
router.get('/logout',logout);
router.get('/cashflow/:userId',getCashflow);


module.exports = router;