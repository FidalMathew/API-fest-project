const { Router } = require('express')
const {
  getExpenseUser,
  createExpenseUser,
} = require('../controllers/expenseController')

const router = Router()

router.get('/expense/:id', getExpenseUser)
router.post('/expense', createExpenseUser)

module.exports = router
