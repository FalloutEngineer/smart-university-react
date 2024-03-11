const mongoose = require("mongoose")

const Role = new mongoose.Schema({
  isSuperAdmin: { type: Boolean, unique: false, required: true },
  isAdmin: { type: Boolean, unique: true, required: true },
  isEditor: { type: Boolean, unique: false, required: true },
  couldEditDamage: { type: Boolean, unique: false, required: true },
  buildings: [{ type: ObjectId, ref: "Building" }],
  floors: [[{ type: ObjectId, ref: "Floor" }]],
  faculties: [{ type: ObjectId, ref: "Faculty" }],
  rooms: [{ type: ObjectId, ref: "Room" }],
})

module.exports = mongoose.model("Role", Role)
