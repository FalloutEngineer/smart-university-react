const mongoose = require("mongoose")

const damagePostSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  photo_links: {
    type: [String],
    required: false,
  },
  corpus: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  sum: {
    type: String,
    required: false,
  },
})

module.exports = mongoose.model("DamagePost", damagePostSchema)
