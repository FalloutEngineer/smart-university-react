const mongoose = require("mongoose")

const buildingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  floors: {
    type: [],
    required: true,
  },
  svg: {
    type: String,
  },
  background: {
    type: String,
  },
  address: {
    type: String,
  },
  description: {
    type: String,
  },
})

module.exports = mongoose.model("Building", buildingSchema)
