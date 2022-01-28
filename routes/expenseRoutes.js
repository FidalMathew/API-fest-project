const { Router } = require('express')
const {
  getExpenseUser,
  createExpenseUser,
  getAllExpenseByUserId
} = require('../controllers/expenseController')

const router = Router()

router.get('/getExpenseByUser/:userId', getAllExpenseByUserId)
router.get('/expense/:id', getExpenseUser)
router.post('/expense', createExpenseUser)

module.exports = router
