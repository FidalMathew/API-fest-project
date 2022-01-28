const { Router } = require('express')
const {
  getIncomeUser,
  createIncomeUser,
  getAllIncomeByUserId
} = require('../controllers/incomeController')

const router = Router()

router.post('/income', createIncomeUser)
router.get('/getIncomeByUser/:userId', getAllIncomeByUserId)
router.get('/income/:id', getIncomeUser)

module.exports = router
