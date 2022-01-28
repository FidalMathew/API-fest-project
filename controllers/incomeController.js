const Income = require('../models/incomeSchema')
const User = require('../models/userSchema')

const getIncomeUser = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id)
    res.status(200).json(income)
  } catch (error) {
    res.status(500).json(error)
  }
}

const createIncomeUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId)
    const income = await Income.create(req.body)
    const add = user.balance + income.income
    user.balance = add
    await user.save()
    res.status(201).json(income)
  } catch (error) {
    console.log(error.message)
    res.status(500).json()
  }
}

const getAllIncomeByUserId = async (req, res) => {
  try {
    const all = await Income.find({
      userId: req.params.userId
    })
    res.status(200).json(all)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  getIncomeUser,
  createIncomeUser,
  getAllIncomeByUserId
}
