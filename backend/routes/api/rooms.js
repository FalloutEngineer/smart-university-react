const express = require("express")
const router = express.Router()
const Room = require("../../models/room")

//get all
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find()
    res.json(rooms)
  } catch (err) {
    res.status().json({ message: err.message })
  }
})

//get one
router.get("/:number", getRoom, (req, res) => {
  res.json(res.room)
})

async function getRoom(req, res, next) {
  try {
    room = await Room.findOne({
      number: req.params.number,
    })
    if (room == null) {
      return res.status(404).json({ message: "Can't find room" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.room = room
  next()
}

module.exports = router
