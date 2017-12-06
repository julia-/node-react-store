const User = require('../models/User')

function register(req, res, next) {
  // Create a new user model
  const user = new User({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  })
  // Create the user with the specified password
  // register is a function from passport not the same as this function
  User.register(user, req.body.password, (error, user) => {
    if (error) {
      // Registration middleware failed
      next(error)
      return
    }
    // Store user so we can accss it in our handler
    req.user = user
    // Success
    next()
  })
}

module.exports = {
  register
}