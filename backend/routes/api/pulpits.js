const express = require("express")
const router = express.Router()
const Pulpit = require("../../models/pulpit")
const Faculty = require("../../models/faculty")
const Room = require("../../models/room")

const requireAuth = require("../../middleware/requireAuth.js")
const { isEditor } = require("../../util/permissionsCheckers.js")

//get all
router.get("/", async (req, res) => {
  try {
    const pulpits = await Pulpit.find()
    res.json(pulpits)
  } catch (err) {
    res.status().json({ message: err.message })
  }
})

//get one
router.get("/:name", getPulpit, (req, res) => {
  res.json(res.pulpit)
})

async function getPulpit(req, res, next) {
  let pulpit
  try {
    pulpit = await Pulpit.findOne({
      name: req.params.name,
    })
    if (pulpit == null) {
      return res.status(404).json({ message: "Can't find pulpit" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.pulpit = pulpit
  next()
}

//create one
router.post("/", requireAuth, async (req, res) => {
  if (isEditor(req.role)) {
    let isFacultyExists = await Faculty.exists({ name: req.body.faculty })
    let roomsArray = []

    for (const room of req.body.rooms) {
      roomsArray.push(null != (await Room.exists({ number: room })))
    }

    let isRoomsExists = roomsArray.every((i) => i === true)

    if (isFacultyExists && isRoomsExists) {
      const pulpit = new Pulpit({
        name: req.body.name,
        faculty: req.body.faculty,
        rooms: req.body.rooms,
      })

      try {
        const newPulpit = await pulpit.save()

        const faculty = await Faculty.findOne({ name: req.body.faculty })
        faculty.pulpits.push(req.body.name)
        const updatedFaculty = await faculty.save()

        res.status(201).json({ pulpit: newPulpit, faculty: updatedFaculty })
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
    } else {
      res.status(400).json({ message: "Invalid room or faculty" })
    }
  } else {
    res.status(400).json({ message: "Not enough rights" })
  }
})

// delete one
router.delete("/:name", requireAuth, getPulpit, async (req, res) => {
  if (isEditor(req.role)) {
    try {
      await Faculty.updateOne(
        { pulpits: res.pulpit.name },
        {
          $pullAll: {
            pulpits: [res.pulpit.name],
          },
        }
      )
      await Room.updateMany(
        { name: res.pulpit.faculty },
        {
          $pullAll: {
            pulpits: [res.pulpit.name],
          },
        }
      )
      await res.pulpit.remove()
      res.json({ message: "Deleted Pulpit" })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res.status(400).json({ message: "Not enough rights" })
  }
})

module.exports = router
