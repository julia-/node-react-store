const env = require('dotenv').config({ path: '../.env' })
const mongoose = require('mongoose')

const mongoURI = process.env.MONGODB_URI

// Use the Promise functionality built into Node.js
mongoose.Promise = global.Promise

// Connect to our local database
// If you don't pass a callback, it will return a promise
mongoose.connect(
  `${mongoURI}`,
  { useMongoClient: true }
)
  .then(() => {
    console.log('Successfully connected to the database')
  })
  .catch(error => {
    console.error('Error connecting to MongoDB database', error)
  })

module.exports = mongoose