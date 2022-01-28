const { Router } = require('express')
const {
  getIncomeUser,
  createIncomeUser,
  getAllIncomeByUserId
} = require('../controllers/incomeController')
const {checkUser} = require('../middlewares/authMiddlewares')


const router = Router()

// all protected routes
// routes for create income
router.post('/income',checkUser, createIncomeUser)
// routes for get all income by user id
router.get('/getIncomeByUser/:userId',checkUser, getAllIncomeByUserId)
// routes for get income by income id
router.get('/income/:id',checkUser, getIncomeUser)

module.exports = router
