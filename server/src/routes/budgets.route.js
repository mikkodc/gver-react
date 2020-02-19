const express = require('express')
const router = express.Router()

// model
const Budget = require('../models/budget.model')

// Get all budgets
router.get('/', async (req, res) => {
  try {
    const budgets = await Budget.find()
    res.json(budgets)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Create one budget
router.post('/', async (req, res) => {
  const budget = new Budget({
    name: req.body.name,
    amount: req.body.amount,
    walletID: req.body.walletID,
  })

  try {
    const newBudget = await budget.save()
    res.status(201).json(newBudget)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Get one budget
router.get('/:id', getBudget, (req, res) => {
  res.json(res.budget)
})

// Update one budget
router.patch('/:id', getBudget, async (req, res) => {
  if (req.body.name != null) {
    res.budget.name = req.body.name
  }
  if (req.body.amount != null) {
    res.budget.amount = req.body.amount
  }
  if (req.body.walletID != null) {
    res.budget.walletID = req.body.walletID
  }
  try {
    const updatedBudget = await res.budget.save()
    res.json(updatedBudget)
  } catch {
    res.status(400).json({ message: err.message })
  }
})

// Delete one budget
router.delete('/:id', getBudget, async (req, res) => {
  try {
    await res.budget.remove()
    res.json({ message: 'Budget deleted' })
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

async function getBudget(req, res, next) {
  try {
    budget = await Budget.findById(req.params.id)
    if (budget == null) {
      return res.status(404).json({ message: 'Cant find budget'})
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }

  res.budget = budget
  next()
}

module.exports = router