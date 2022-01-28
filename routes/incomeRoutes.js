const { Router } = require('express')
const {
  getIncomeUser,
  createIncomeUser,
  getAllIncomeByUserId
} = require('../controllers/incomeController')

const router = Router()

router.get('/getIncomeByUser/:userId', getAllIncomeByUserId)
router.get('/income/:id', getIncomeUser)
router.post('/income', createIncomeUser)

module.exports = router
