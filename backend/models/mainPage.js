const mongoose = require("mongoose")

const mainPageSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    unique: false,
  },
  buttonLink: {
    type: String,
    required: false,
  },
  images: {
    type: [String],
    required: false,
  },
})

module.exports = mongoose.model("MainPage", mainPageSchema)
