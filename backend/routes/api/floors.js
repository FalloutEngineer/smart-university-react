const express = require("express")
const router = express.Router()
const Floor = require("../../models/floor")
const Room = require("../../models/room")
const Faculty = require("../../models/faculty")
const Building = require("../../models/building")

const requireAuth = require("../../middleware/requireAuth.js")

const multer = require("multer")
const path = require("path")
const fs = require("fs")
const {
  isEditor,
  canEditThisFloor,
} = require("../../util/permissionsCheckers.js")

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
router.get("/:building/:number", getFloor, (req, res) => {
  res.json(res.floor)
})

//create one
router.post("/", requireAuth, upload.single("svg"), async (req, res) => {
  if (isEditor(req.role)) {
    let isFacultyExists = await Faculty.exists({ name: req.body.faculty })
    let isBuildingExists = await Building.exists({ name: req.body.building })
    let roomsArray = []

    if (req.body.rooms == null || req.body.rooms == undefined) {
      req.body.rooms = []
    }

    req.body.rooms.forEach((room) => {
      roomsArray.push(Room.exists({ number: room }))
    })

    let isRoomsExists = roomsArray.every((i) => i === true)

    let svg

    if (req.file) {
      svg = req.file.filename
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
        svg: svg,
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
  } else {
    res.status(400).json({ message: "Not enough rights" })
  }
})

// delete one
router.delete("/:building/:number", requireAuth, getFloor, async (req, res) => {
  if (isEditor(req.role)) {
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
  } else {
    res.status(400).json({ message: "Not enough rights" })
  }
})

async function getFloor(req, res, next) {
  let floor
  try {
    floor = await Floor.findOne({
      building: req.params.building,
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

router.patch("/:building/:number", requireAuth, getFloor, async (req, res) => {
  if (canEditThisFloor(res.floor.id, req.role)) {
    if (req.body.floorColor != null) {
      res.floor.floorColor = req.body.floorColor
    }

    if (req.body.co2SensorURL != null) {
      res.floor.co2SensorURL = req.body.co2SensorURL
    }

    try {
      const updatedFloor = await res.floor.save()
      res.json(updatedFloor)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  } else {
    res.status(500).json({ message: "Not enough rights" })
  }
})

module.exports = router
