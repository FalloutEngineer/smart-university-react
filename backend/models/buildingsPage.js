const mongoose = require("mongoose")

const buildingsPageSchema = new mongoose.Schema({
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

module.exports = mongoose.model("BuildingsPage", buildingsPageSchema)
