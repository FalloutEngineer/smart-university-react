const express = require("express")
const router = express.Router()
const FacultyCard = require("../../models/facultyCard")

const requireAuth = require("../../middleware/requireAuth.js")

//get all
router.get("/", async (req, res) => {
  try {
    const cards = await FacultyCard.find()
    res.json(cards)
  } catch (err) {
    res.status().json({ message: err.message })
  }
})

//get one
router.get("/:name", getCard, (req, res) => {
  res.json(res.floor)
})

//create one
router.post("/", requireAuth, async (req, res) => {
  const isFacultyCardExists = await FacultyCard.exists({ name: req.body.name })

  if (!isFacultyCardExists) {
    const facultyCard = new FacultyCard({
      name: req.body.name,
      icon: req.body.icon,
      area: req.body.area,
      color: req.body.color,
      seats: req.body.seats,
      pulpits: req.body.pulpits,
      rooms: req.body.rooms,
      bachelorFull: req.body.bachelorFull,
      bachelorPart: req.body.bachelorPart,
      masterFull: req.body.masterFull,
      masterPart: req.body.masterPart,
      phdFull: req.body.phdFull,
      phdPart: req.body.phdPart,
    })

    try {
      const newFacultyCard = await facultyCard.save()

      res.status(201).json({
        message: `Successfuly created faculties page!`,
        page: newFacultyCard,
      })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  } else {
    res.status(400).json({ message: "Faculty already exists" })
  }
})

// delete one
router.delete("/:number", requireAuth, getCard, async (req, res) => {
  try {
    await res.card.remove()
    res.json({ message: "Deleted Card" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

async function getCard(req, res, next) {
  let card
  try {
    card = await FacultyCard.findOne({
      name: req.params.name,
    })
    if (card == null) {
      return res.status(404).json({ message: "Can't find card" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.card = card
  next()
}

module.exports = router
