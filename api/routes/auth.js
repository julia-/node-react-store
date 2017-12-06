const express = require('express')
const authMiddleware = require('../middleware/auth')

const router = new express.Router()

// Registering/Sign up
router.post('/auth/register',
  /* Middleware to handle the registration process */
  authMiddleware.register,
  /* JSON handler */
  authMiddleware.signJWTForUser
)

router.post('/auth',
  /* Middleware to handle the sign in process */
  authMiddleware.signIn,
  /* JSON handler */
  authMiddleware.signJWTForUser
)

module.exports = router