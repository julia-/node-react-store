const express = require('express')
const authMiddleware = require('../middleware/auth')

const router = new express.Router()

// Registering/Sign up
router.post('/auth/register',
  /* Middleware to handle the registration process */
  authMiddleware.register,
  /* JSON handler */
  (req, res) => {
    res.json({
      user: req.user
    })
  }
)

module.exports = router