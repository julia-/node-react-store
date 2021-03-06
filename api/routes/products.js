const express = require('express')
const Product = require('../models/Product')
const authMiddleware = require('../middleware/auth')

const router = new express.Router()

router.get('/products', authMiddleware.requireJWT, (req, res) => {
  Product.find()
    .then(products => {
      res.json(products)
    })
    .catch(error => {
      res.status(400).json({ error })
    })
})

router.get('/products/:id', authMiddleware.requireJWT, (req, res) => {
  const id = req.params.id
  Product.findById(id)
    .then(product => {
      res.json(product)
    })
    .catch(error => {
      res.status(400).json({ error })
    })
})

router.post('/products', authMiddleware.requireJWT, (req, res) => {
  const attributes = req.body
  Product.create(attributes)
  .then(product => {
    res.status(201).json(product)
  })
  .catch(error => {
    res.status(400).json({ error })
  })
})

router.put('/products/:id', authMiddleware.requireJWT, (req, res) => {
  const { id } = req.params
  Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
    .then(product => {
      if (product) {
        res.json(product)
      }
      else {
        res.status(404).json({
          error: new Error(`Product with id '${id}' not found`)
        })
      }
    })
    .catch(error => {
      res.status(400).json({ error })
    })
})

module.exports = router