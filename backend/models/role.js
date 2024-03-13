const mongoose = require("mongoose")

const ObjectId = mongoose.Schema.Types.ObjectId

const Role = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  isSuperAdmin: { type: Boolean, unique: false, required: true },
  isAdmin: { type: Boolean, unique: false, required: true },
  isEditor: { type: Boolean, unique: false, required: true },
  canEditDamage: { type: Boolean, unique: false, required: true },
  buildings: [{ type: ObjectId, ref: "Building" }],
  floors: [[{ type: ObjectId, ref: "Floor" }]],
  faculties: [{ type: ObjectId, ref: "Faculty" }],
  rooms: [{ type: ObjectId, ref: "Room" }],
})

module.exports = mongoose.model("Role", Role)
