const Expense = require('../models/expenseSchema')
const User = require('../models/userSchema')

const getExpenseUser = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id)
    res.status(200).json(expense)
  } catch (error) {
    res.status(500).json(error)
  }
}

const createExpenseUser = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId)
    const expense = await Expense.create(req.body)
    const deduct = user.balance - expense.amount
    user.balance = deduct
    await user.save()
    res.status(201).json(expense)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getAllExpenseByUserId = async (req, res) => {
  try {
    const all = await Expense.find({
      userId: req.params.userId,
    })
    res.status(200).json(all)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  getExpenseUser,
  createExpenseUser,
  getAllExpenseByUserId,
}
