const Expense = require('../models/expenseSchema')

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
    const expense = await Expense.create(req.body)
    res.status(201).json(expense)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  getExpenseUser,
  createExpenseUser,
}
