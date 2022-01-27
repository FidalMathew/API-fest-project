const {Router} = require('express')
const { createUser }= require('../controllers/userController')


const router = Router();


router.post('/user',createUser)


module.exports = router;