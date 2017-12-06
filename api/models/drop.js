const Product = require('./Product')
const Product = require('./User')

Product.deleteMany()
  .then(() => {
    console.log('Deleted products')
  })

User.deleteMany()
  .then(() => {
    console.log('Deleted users')
    process.exit()
  })