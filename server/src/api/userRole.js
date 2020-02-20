const { Router } = require('express')
const router = Router()

// model
const UserRole = require('../models/userRole')

router.get('/', async (req, res, next) => {
  try {
    const roles = await UserRole.find();
    res.json(roles)
  } catch (error) {
    next(error)
  }
})

// Create one user role
router.post('/', async (req, res) => {
  const userRole = new UserRole(req.body)

  try {
    const newUserRole = await userRole.save()
    res.status(201).json(newUserRole)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router;