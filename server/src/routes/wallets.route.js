const express = require('express')
const router = express.Router()


const Wallet = require('../models/wallet.model')

// Get all wallets
router.get('/', async (req, res) => {
  try {
    const wallets = await Wallet.find()
    res.json(wallets)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Create one wallet
router.post('/', async (req, res) => {
  const wallet = new Wallet({
    name: req.body.name,
    amount: req.body.amount
  })

  try {
    const newWallet = await wallet.save()
    res.status(201).json(newWallet)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// Get one wallet
router.get('/:id', getWallet, (req, res) => {
  res.json(res.wallet)
})

// Update one wallet
router.patch('/:id', getWallet, async (req, res) => {
  if (req.body.name != null) {
    res.wallet.name = req.body.name
  }

  if (req.body.amount != null) {
    res.wallet.amount = req.body.amount
  }
  try {
    const updatedWallet = await res.wallet.save()
    res.json(updatedWallet)
  } catch {
    res.status(400).json({ message: err.message })
  }
})

// Delete one wallet
router.delete('/:id', getWallet, async (req, res) => {
  try {
    await res.wallet.remove()
    res.json({ message: 'Deleted This Wallet' })
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
})

async function getWallet(req, res, next) {
  try {
    wallet = await Wallet.findById(req.params.id)
    if (wallet == null) {
      return res.status(404).json({ message: 'Cant find wallet'})
    }
  } catch(err){
    return res.status(500).json({ message: err.message })
  }

  res.wallet = wallet
  next()
}

module.exports = router