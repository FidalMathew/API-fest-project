const User = require('../models/userSchema')

const createUser = async (req, res) => {
  try {
    const body = req.body
    const user = await User.create(body)
    res.status(201).json(user)
  } catch (error) {
    res.status(500).json(error)
  }
}

module.exports = {
  createUser
}
