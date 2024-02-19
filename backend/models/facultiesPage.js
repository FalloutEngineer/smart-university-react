const mongoose = require("mongoose")

const facultiesPageSchema = new mongoose.Schema({
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

module.exports = mongoose.model("FacultiesPage", facultiesPageSchema)
