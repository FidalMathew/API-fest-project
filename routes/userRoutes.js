const {Router} = require('express')
const { 
    // createUser,
    signupAuth,
    signinAuth,
    logout } = require('../controllers/userController')


const router = Router();

router.post('/signupAuth',signupAuth);
router.post('/signinAuth',signinAuth);
// router.patch('/user/:id',createUser)
router.get('/logout',logout);


module.exports = router;