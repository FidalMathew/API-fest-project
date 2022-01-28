const { Router } = require('express')
const {
  getExpenseUser,
  createExpenseUser,
  getAllExpenseByUserId
} = require('../controllers/expenseController')
const {checkUser} = require('../middlewares/authMiddlewares')


const router = Router()

router.post('/expense',checkUser, createExpenseUser)
router.get('/getExpenseByUser/:userId',checkUser, getAllExpenseByUserId)
router.get('/expense/:id',checkUser, getExpenseUser)

module.exports = router
