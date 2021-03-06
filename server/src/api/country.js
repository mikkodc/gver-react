const { Router } = require('express')
const router = Router()

// model
const Country = require('../models/country')

router.get('/', async (req, res, next) => {
  try {
    const roles = await Country.find();
    res.json(roles)
  } catch (error) {
    next(error)
  }
})

// Create one user role
router.post('/', async (req, res) => {
  const country = new Country(req.body)

  try {
    const newCountry = await country.save()
    res.status(201).json(newCountry)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router;