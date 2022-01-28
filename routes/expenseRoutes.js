const { Router } = require('express')
const {
  getExpenseUser,
  createExpenseUser,
  getAllExpenseByUserId
} = require('../controllers/expenseController')
const {checkUser} = require('../middlewares/authMiddlewares')


const router = Router()

// all are protected routes
// routes for creating expense
router.post('/expense',checkUser, createExpenseUser)
// routes for getting all the expenses by particular user _id
router.get('/getExpenseByUser/:userId',checkUser, getAllExpenseByUserId)
// getting particular expense by expense id
router.get('/expense/:id',checkUser, getExpenseUser)

module.exports = router
