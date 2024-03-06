const express = require("express")
const router = express.Router()
const Floor = require("../../models/floor")
const Room = require("../../models/room")
const Faculty = require("../../models/faculty")
const Building = require("../../models/building")

const requireAuth = require("../../middleware/requireAuth.js")

const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static/svg/floor")
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
    const floors = await Floor.find()
    res.json(floors)
  } catch (err) {
    res.status().json({ message: err.message })
  }
})

//get one
router.get("/:number", getFloor, (req, res) => {
  res.json(res.floor)
})

//create one
router.post("/", requireAuth, upload.single("svg"), async (req, res) => {
  let isFacultyExists = await Faculty.exists({ name: req.body.faculty })
  let isBuildingExists = await Building.exists({ name: req.body.building })
  let roomsArray = []

  req.body.rooms.forEach((room) => {
    roomsArray.push(Room.exists({ number: room }))
  })

  let isRoomsExists = roomsArray.every((i) => i === true)

  if (req.body.rooms == null || req.body.rooms == undefined) {
    req.body.rooms = []
  }

  if (isFacultyExists && isRoomsExists && isBuildingExists) {
    const floor = new Floor({
      number: req.body.number,
      faculty: req.body.faculty,
      rooms: req.body.rooms,
      building: req.body.building,
      temperatureSensorURL: req.body.temperatureSensorURL,
      co2SensorURL: req.body.co2SensorURL,
      floorColor: req.body.floorColor ?? "#ffffff",
    })

    try {
      const newFloor = await floor.save()

      const faculty = await Faculty.findOne({ name: req.body.faculty })
      faculty.floors.push(req.body.number)
      const updatedFaculty = await faculty.save()

      const building = await Building.findOne({ name: req.body.building })
      building.floors.push(req.body.number)
      const updatedBuilding = await building.save()

      res.status(201).json({
        floor: newFloor,
        faculty: updatedFaculty,
        building: updatedBuilding,
      })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  } else {
    res.status(400).json({ message: "Invalid building or faculty" })
  }
})

// delete one
router.delete("/:number", requireAuth, getFloor, async (req, res) => {
  try {
    if (res.floor.svg) {
      const address = path.resolve("./static/svg/floor/" + res.floor.svg)
      if (fs.existsSync(address)) {
        fs.unlinkSync(address)
      }
    }

    await Faculty.updateOne(
      { name: res.floor.faculty },
      {
        $pullAll: {
          floors: [res.floor.number],
        },
      }
    )
    await Building.updateOne(
      { name: res.floor.building },
      {
        $pullAll: {
          floors: [res.floor.number],
        },
      }
    )
    await res.floor.remove()
    res.json({ message: "Deleted Floor" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getFloor(req, res, next) {
  let floor
  try {
    floor = await Floor.findOne({
      number: req.params.number,
    })
    if (floor == null) {
      return res.status(404).json({ message: "Can't find floor" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.floor = floor
  next()
}

module.exports = router
