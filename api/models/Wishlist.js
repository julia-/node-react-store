const mongoose = require('./init')
const Schema = mongoose.Schema

const wishlistSchema = new Schema({
  user: { type: Schema.ObjectId, ref: 'User', unique: true }, // User can only have one wishlist
  product: [{ type: Schema.ObjectId, ref: 'Product' }]
})

const Wishlist = mongoose.model('Wishlist', wishlistSchema)

module.exports = Wishlist