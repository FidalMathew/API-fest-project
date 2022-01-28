const Expense = require('../models/expenseSchema')
const User = require('../models/userSchema')

const getExpenseUser = async (req, res) => {
  try {
    // find expense by id
    const expense = await Expense.findById(req.params.id)
    // send response in expense 
    res.status(200).json(expense)
  } catch (error) {
    // if error then send error message
    res.status(500).json({error : error.message})
  }
}

const createExpenseUser = async (req, res) => {
  try {
    // get user by id
    const user = await User.findById(req.body.userId)
    // create expense
    const expense = await Expense.create(req.body)
    // deducting expenses from balance
    const deduct = user.balance - expense.amount
    // updating the balance
    user.balance = deduct
    // save the updated value
    await user.save()
    // send response
    res.status(201).json(expense)
  } catch (error) {
    res.status(500).json(error)
  }
}

const getAllExpenseByUserId = async (req, res) => {
  try {
    // finding the expenses according to user id
    const all = await Expense.find({
      userId: req.params.userId
    })
    // send response
    res.status(200).json(all)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  getExpenseUser,
  createExpenseUser,
  getAllExpenseByUserId
}
