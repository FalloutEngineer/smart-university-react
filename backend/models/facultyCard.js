const mongoose = require("mongoose")

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  area: {
    type: [Number],
    required: false,
  },
  pulpits: {
    type: [Number],
    required: false,
  },
  rooms: {
    type: [Number],
    required: false,
  },
  bachelorFull: {
    type: [Number],
    required: false,
  },
  bachelorPart: {
    type: [Number],
    required: false,
  },
  masterFull: {
    type: [Number],
    required: false,
  },
  masterPart: {
    type: [Number],
    required: false,
  },
  phdFull: {
    type: [Number],
    required: false,
  },
  phdPart: {
    type: [Number],
    required: false,
  },
})

module.exports = mongoose.model("Faculty", facultySchema)
