const { Router } = require('express')
const {
  getExpenseUser,
  createExpenseUser,
  getAllExpenseByUserId
} = require('../controllers/expenseController')

const router = Router()

router.post('/expense', createExpenseUser)
router.get('/getExpenseByUser/:userId', getAllExpenseByUserId)
router.get('/expense/:id', getExpenseUser)

module.exports = router
