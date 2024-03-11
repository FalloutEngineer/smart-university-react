const mongoose = require("mongoose")

const User = new mongoose.Schema({
  login: { type: String, unique: true, required: true },
  name: { type: String, unique: false, required: false },
  role: { type: ObjectId, ref: "Role", unique: false, required: false },
  password: { type: String, required: true },
})

module.exports = mongoose.model("User", User)
