const mongoose = require("mongoose")

const homePageSchema = new mongoose.Schema(
  {
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
  },
  {
    collection: "HomePage",
    capped: { size: 1024, max: 1 },
  }
)

module.exports = mongoose.model("HomePage", homePageSchema)
