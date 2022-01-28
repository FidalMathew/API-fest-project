const Income = require('../models/incomeSchema')
const User = require('../models/userSchema')

const getIncomeUser = async (req, res) => {
  try {
    // find income by id
    const income = await Income.findById(req.params.id)
    // send income in response
    res.status(200).json(income)
  } catch (error) {
    res.status(500).json(error)
  }
}

const createIncomeUser = async (req, res) => {
  try {
    // find user by user id
    const user = await User.findById(req.body.userId)
    // create income for the user
    const income = await Income.create(req.body)
    // update the user balance
    const add = user.balance + income.income
    user.balance = add
    // save the updated balance
    await user.save()
    // send response
    res.status(201).json(income)
  } catch (error) {
    console.log(error.message)
    res.status(500).json()
  }
}

const getAllIncomeByUserId = async (req, res) => {
  try {
    // get all income ny user id
    const all = await Income.find({
      userId: req.params.userId
    })
    // send all income in response
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
