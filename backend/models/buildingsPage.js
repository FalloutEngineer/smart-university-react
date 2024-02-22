const mongoose = require("mongoose")

const buildingsPageSchema = new mongoose.Schema(
  {
    heading: {
      type: String,
      required: true,
      unique: false,
    },
    description: {
      type: String,
      required: false,
    },
    images: {
      type: [String],
      required: false,
    },
  },
  {
    collection: "BuildingsPage",
    capped: { size: 1024, max: 1 },
  }
)

module.exports = mongoose.model("BuildingsPage", buildingsPageSchema)
