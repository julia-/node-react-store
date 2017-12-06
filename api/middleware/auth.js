const env = require('dotenv').config({ path: '../.env' })

const passport = require('passport')
const JWT = require('jsonwebtoken')
const PassportJwT = require('passport-jwt')
const User = require('../models/User')

const jwtSecret = process.env.JWT_SECRET
const jwtAlgorithm = process.env.JWT_ALGORITHM
const jwtExpiresIn = process.env.JWT_EXPIRES_IN

passport.use(User.createStrategy())

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

passport.use(new PassportJwT.Strategy(
  {
    jwtFromRequest: PassportJwT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: jwtSecret,
    algorithms: [jwtAlgorithm]
  },
  // When we have a verified token
  (payload, done) => {
    // Find the real user from the database using the 'id' in the JWT
    User.findById(payload.sub)
      .then((user) => {
        // If user was found with this id
        if (user) {
          done(null, user)
        }
        // If not user was found
        else {
          done(null, false)
        }
      })
      .catch((error) => {
        // If there was a failure
        done(error, false)
      })
  }
))

function signJWTForUser(req, res) {
  const user = req.user
  const token = JWT.sign(
    // Payload
    {
      email: user.email
    },
    // Secret
    jwtSecret,
    // Options
    {
      algorithm: jwtAlgorithm,
      expiresIn: jwtExpiresIn,
      subject: user._id.toString()
    }
  )

  res.json({ token })
}

module.exports = {
  initialize: passport.initialize(),
  register,
  signIn: passport.authenticate('local', { session: false }),
  requireJWT: passport.authenticate('jwt', { session: false }),
  signJWTForUser
}