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
  res.json(res.card)
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
        message: `Successfuly created faculty card!`,
        page: newFacultyCard,
      })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  } else {
    res.status(400).json({ message: "Faculty already exists" })
  }
})

// edit one
router.patch("/:name", requireAuth, getCard, async (req, res) => {
  if (req.body.name != null) {
    res.card.name = req.body.name
  }
  if (req.body.icon != null) {
    res.card.icon = req.body.icon
  }
  if (req.body.area != null) {
    res.card.area = req.body.area
  }
  if (req.body.color != null) {
    res.card.color = req.body.color
  }
  if (req.body.seats != null) {
    res.card.seats = req.body.seats
  }
  if (req.body.pulpits != null) {
    res.card.pulpits = req.body.pulpits
  }
  if (req.body.cards != null) {
    res.card.cards = req.body.cards
  }

  if (req.body.rooms != null) {
    res.card.rooms = req.body.rooms
  }

  if (req.body.bachelorFull != null) {
    res.card.bachelorFull = req.body.bachelorFull
  }
  if (req.body.bachelorPart != null) {
    res.card.bachelorPart = req.body.bachelorPart
  }
  if (req.body.masterFull != null) {
    res.card.masterFull = req.body.masterFull
  }
  if (req.body.masterPart != null) {
    res.card.masterPart = req.body.masterPart
  }
  if (req.body.phdFull != null) {
    res.card.phdFull = req.body.phdFull
  }
  if (req.body.phdPart != null) {
    res.card.phdPart = req.body.phdPart
  }
  try {
    const updatedCard = await res.card.save()
    res.json(updatedCard)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

// delete one
router.delete("/:name", requireAuth, getCard, async (req, res) => {
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
