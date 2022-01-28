const { Router } = require('express')
const {
  getIncomeUser,
  createIncomeUser,
  getAllIncomeByUserId
} = require('../controllers/incomeController')
const {checkUser} = require('../middlewares/authMiddlewares')


const router = Router()

router.post('/income',checkUser, createIncomeUser)
router.get('/getIncomeByUser/:userId',checkUser, getAllIncomeByUserId)
router.get('/income/:id',checkUser, getIncomeUser)

module.exports = router
