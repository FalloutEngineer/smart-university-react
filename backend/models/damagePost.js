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
  status: {
    type: String,
    required: true,
  },
  building: {
    type: String,
    required: true,
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
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model("DamagePost", damagePostSchema)
