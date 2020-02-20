const { Router } = require('express')
const router = Router()

// model
const UserType = require('../models/userType')

router.get('/', async (req, res, next) => {
  try {
    const types = await UserType.find();
    res.json(types)
  } catch (error) {
    next(error)
  }
})

// Create one user role
router.post('/', async (req, res) => {
  const userType = new UserType(req.body)

  try {
    const newUserType = await userType.save()
    res.status(201).json(newUserType)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router;