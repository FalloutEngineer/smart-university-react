const mongoose = require("mongoose")

const ObjectId = mongoose.Schema.Types.ObjectId

const Role = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  isSuperAdmin: { type: Boolean, unique: false, required: true },
  isAdmin: { type: Boolean, unique: false, required: true },
  isEditor: { type: Boolean, unique: false, required: true },
  canEditDamage: { type: Boolean, unique: false, required: true },
  buildings: [{ type: ObjectId, ref: "Building", required: false }],
  floors: [[{ type: ObjectId, ref: "Floor", required: false }]],
  faculties: [{ type: ObjectId, ref: "Faculty", required: false }],
  rooms: [{ type: ObjectId, ref: "Room", required: false }],
})

module.exports = mongoose.model("Role", Role)
