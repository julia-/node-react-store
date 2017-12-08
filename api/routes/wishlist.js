const express = require('express')
const Wishlist = require('../models/Wishlist')
const { requireJWT } = require('../middleware/auth')

const router = new express.Router()

router.get('/wishlist', requireJWT, (req, res) => {
  Wishlist.findOne({ user: req.user })
  .populate('products')
    .then(wishlist => {
      if (wishlist) {
        res.json({ products: wishlist.products })
      }
      else {
        res.json({ products: [] })
      }
    })
    .catch(error => {
      res.status(500).json({ error })
    })
})

router.post('/wishlist/products/:productID', requireJWT, (req, res) => {
  const { productID } = req.params
  Wishlist.findOneAndUpdate(
    // Find wishlist for signed in user
    { user: req.user },
    // Make these changes
    { $addToSet: { products: productID } },
    // Options when updating
    // upsert: Update is exists, inserts (create) if not
    // new: give the update wishlist
    { upsert: true, new: true, runValidators: true }
  )
    .populate('products')
    .then(wishlist => {
      res.json({ products: wishlist.products })
    })
    .catch(error => {
      res.status(400).json({ error })
    })
})

router.delete('/wishlist/products/:productID', requireJWT, (req, res) => {
  const { productID } = req.params
    Wishlist.findOneAndUpdate(
      // Find wishlist for signed in user
      { user: req.user },
      // Make these changes
      { $pull: { products: productID } },
      // Options when updating
      // upsert: Update is exists, inserts (create) if not
      // new: give the update wishlist
      { upsert: true, new: true, runValidators: true }
    )
      .populate('products')
      .then(wishlist => {
        res.json({ products: wishlist.products })
      })
      .catch(error => {
        res.status(400).json({ error })
      })
})

module.exports = router