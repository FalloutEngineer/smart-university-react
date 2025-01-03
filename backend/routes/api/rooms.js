const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const fs = require("fs")

const Room = require("../../models/room")
const Pulpit = require("../../models/pulpit")
const Faculty = require("../../models/faculty")
const Floor = require("../../models/floor")

const requireAuth = require("../../middleware/requireAuth.js")

const {
  canEditThisRoom,
  isEditor,
} = require("../../util/permissionsCheckers.js")

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
  let room
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
  if (isEditor(req.role)) {
    try {
      if (req.body.number) {
        req.body.number = Number(req.body.number)
      }

      if (req.body.capacity) {
        req.body.capacity = Number(req.body.capacity)
      }

      if (req.body.building) {
        req.body.building = JSON.parse(req.body.building)
      }

      if (req.body.pulpits) {
        req.body.pulpits = JSON.parse(req.body.pulpits)
      }

      if (req.body.sensorID) {
        req.body.sensorID = JSON.parse(req.body.sensorID)
      }
    } catch (err) {
      console.log(err)
      console.log(req)

      res.status(400).json({ message: err.message })
      return
    }

    // if (req.body.co2) {
    //   req.body.co2 = JSON.parse(req.body.co2)
    // }

    // if (req.body.temperature) {
    //   req.body.temperature = JSON.parse(req.body.temperature)
    // }

    // if (req.body.co2_history) {
    //   req.body.co2_history = JSON.parse(req.body.co2_history)
    // }

    // if (req.body.temperature_history) {
    //   req.body.temperature_history = JSON.parse(req.body.temperature_history)
    // }

    let isFacultyExists = await Faculty.exists({ name: req.body.faculty })
    let isFloorValid = await Floor.exists({
      number: req.body.floor,
      faculty: req.body.faculty,
      building: req.body.building,
    })

    let pulpitsArray = []

    for (const pulpit of req.body.pulpits) {
      pulpitsArray.push(
        null !=
          (await Pulpit.exists({ name: pulpit, faculty: req.body.faculty }))
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
        building: req.body.building,
        photo_links: images[0] != "" ? images : [],
        description: req.body.description,
        assistant: req.body.assistant,
        model: req.body.model,
        pulpits: req.body.pulpits[0] != "" ? req.body.pulpits : [],
        sensorID: req.body.sensorID,
        // co2: req.body.co2[0] != "" ? req.body.co2 : [],
        // temperature: req.body.temperature[0] != "" ? req.body.temperature : [],
        // co2_history: req.body.co2_history[0] != "" ? req.body.co2_history : [],
        // temperature_history:
        //   req.body.temperature_history[0] != ""
        //     ? req.body.temperature_history
        //     : [],
      })

      try {
        const newRoom = await room.save()

        const floorObj = await Floor.findOne({
          number: req.body.floor,
          building: [req.body.building],
        })
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
  } else {
    res.status(400).json({ message: "Not enough rights" })
  }
})

// delete one
router.delete("/:number", requireAuth, getRoom, async (req, res) => {
  try {
    if (isEditor(req.role)) {
      await Floor.updateOne(
        { rooms: res.room.number },
        {
          $pullAll: {
            rooms: [res.room.number],
          },
        }
      )
      await Pulpit.updateMany(
        { rooms: res.room.number },
        {
          $pullAll: {
            rooms: [res.room.number],
          },
        }
      )

      res.room.photo_links.forEach((link) => {
        const address = path.resolve("./static/images/" + link)
        if (fs.existsSync(address)) {
          fs.unlinkSync(address)
        }
      })

      await res.room.remove()
      res.json({ message: "Deleted Room" })
    } else {
      res.status(500).json({ message: "Not enough rights" })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//update one
router.patch(
  "/:number",
  requireAuth,
  upload.any("images"),
  getRoom,
  async (req, res) => {
    if (canEditThisRoom(res.room.id, req.role)) {
      let isFacultyExists = true
      let isFloorExists = true

      if (req.body.floor) req.body.floor = Number(req.body.floor)
      if (req.body.pulpits) req.body.pulpits = JSON.parse(req.body.pulpits[0])

      if (req.body.floor != [] && req.body.floor) {
        isFloorExists = await Floor.exists({ number: req.body.floor })
      }
      if (req.body.faculty != [] && req.body.faculty) {
        isFacultyExists = await Faculty.exists({ name: req.body.faculty })
      }

      let pulpitsArray = []

      let isPulpitssExists = true

      const images = req.files.map((file) => file.filename)

      res.room.photo_links.forEach((link) => {
        const address = path.resolve("./static/images/" + link)
        if (fs.existsSync(address)) {
          fs.unlinkSync(address)
        }
      })

      if (req.body.pulpits) {
        for (const pulpit of req.body.pulpits) {
          pulpitsArray.push(null != (await Pulpit.exists({ name: pulpit })))
        }
        isPulpitssExists = pulpitsArray.every((i) => i === true)
      }

      if (isFacultyExists && isFloorExists && isPulpitssExists) {
        if (req.body.number != null) {
          res.room.number = req.body.number
        }
        if (req.body.floor != null) {
          res.room.floor = req.body.floor
        }
        if (req.body.faculty != null) {
          res.room.faculty = req.body.faculty
        }
        if (req.body.capacity != null) {
          res.room.capacity = req.body.capacity
        }
        if (req.body.type != null) {
          res.room.type = req.body.type
        }
        if (req.body.photo_links != null) {
          res.room.photo_links = images
        }
        if (req.body.description != null) {
          res.room.description = req.body.description
        }
        if (req.body.assistant != null) {
          res.room.assistant = req.body.assistant
        }
        if (req.body.model != null) {
          res.room.model = req.body.model
        }
        if (req.body.pulpits != null) {
          res.room.pulpits = req.body.pulpits
        }
        if (req.body.co2 != null) {
          res.room.co2 = req.body.co2
        }
        if (req.body.temperature != null) {
          res.room.temperature = req.body.temperature
        }
        if (req.body.co2_history != null) {
          res.room.co2_history = req.body.co2_history
        }
        if (req.body.temperature_history != null) {
          res.room.temperature_history = req.body.temperature_history
        }
        try {
          const updatedRoom = await res.room.save()
          res.json(updatedRoom)
        } catch (err) {
          res.status(400).json({ message: err.message })
        }
      } else {
        res.status(400).json({ message: "Invalid floor, faculty or pulpit" })
      }
    } else {
      res.status(400).json({ message: "Not enough rights" })
    }
  }
)

module.exports = router
