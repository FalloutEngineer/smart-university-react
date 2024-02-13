const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")

const Room = require("../../models/room")
const Pulpit = require("../../models/pulpit")
const Faculty = require("../../models/faculty")
const Floor = require("../../models/floor")

const requireAuth = require("../../middleware/requireAuth.js")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static/images")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage,
})

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

//create one
router.post("/", requireAuth, upload.any("images"), async (req, res) => {
  if (req.body.number) {
    req.body.number = Number(req.body.number)
  }

  if (req.body.capacity) {
    req.body.capacity = Number(req.body.capacity)
  }

  if (req.body.pulpits) {
    req.body.pulpits = JSON.parse(req.body.pulpits)
  }

  if (req.body.co2) {
    req.body.co2 = JSON.parse(req.body.co2)
  }

  if (req.body.temperature) {
    req.body.temperature = JSON.parse(req.body.temperature)
  }

  if (req.body.co2_history) {
    req.body.co2_history = JSON.parse(req.body.co2_history)
  }

  if (req.body.temperature_history) {
    req.body.temperature_history = JSON.parse(req.body.temperature_history)
  }

  let isFacultyExists = await Faculty.exists({ name: req.body.faculty })
  let isFloorValid = await Floor.exists({
    number: req.body.floor,
    faculty: req.body.faculty,
  })

  let pulpitsArray = []

  for (const pulpit of req.body.pulpits) {
    pulpitsArray.push(
      null != (await Pulpit.exists({ name: pulpit, faculty: req.body.faculty }))
    )
  }

  let isPulpitsValid = pulpitsArray.every((i) => i === true)

  let images = req.files.map((file) => file.filename)

  if (isFacultyExists && isFloorValid && isPulpitsValid) {
    const room = new Room({
      number: req.body.number,
      floor: req.body.floor,
      faculty: req.body.faculty,
      capacity: req.body.capacity,
      type: req.body.type,
      photo_links: images[0] != "" ? images : [],
      description: req.body.description,
      assistant: req.body.assistant,
      model: req.body.model,
      pulpits: req.body.pulpits[0] != "" ? req.body.pulpits : [],
      co2: req.body.co2[0] != "" ? req.body.co2 : [],
      temperature: req.body.temperature[0] != "" ? req.body.temperature : [],
      co2_history: req.body.co2_history[0] != "" ? req.body.co2_history : [],
      temperature_history:
        req.body.temperature_history[0] != ""
          ? req.body.temperature_history
          : [],
    })

    try {
      const newRoom = await room.save()

      const floorObj = await Floor.findOne({ number: req.body.floor })
      floorObj.rooms.push(req.body.number)
      const updatedFloor = await floorObj.save()

      for (const pulpit of req.body.pulpits) {
        const pulpitObj = await Pulpit.findOne({ name: pulpit })
        pulpitObj.rooms.push(req.body.number)
        const updatedPulpit = await pulpitObj.save()
      }

      res.status(201).json(newRoom)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  } else {
    res.status(400).json({ message: "Invalid floor, faculty or pulpit" })
  }
})

module.exports = router
