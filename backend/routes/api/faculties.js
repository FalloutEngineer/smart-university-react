const express = require("express")
const router = express.Router()
const Faculty = require("../../models/faculty")

const requireAuth = require("../../middleware/requireAuth.js")

//get all
router.get("/", async (req, res) => {
  try {
    const faculties = await Faculty.find()
    res.json(faculties)
  } catch (err) {
    res.status().json({ message: err.message })
  }
})

//get one
router.get("/:name", getFaculty, (req, res) => {
  res.json(res.faculty)
})

//create one
router.post("/", requireAuth, async (req, res) => {
  const faculty = new Faculty({
    name: req.body.name,
    floors: req.body.floors || [],
    pulpits: req.body.pulpits || [],
  })

  try {
    const newFaculty = await faculty.save()
    res.status(201).json(newFaculty)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

async function getFaculty(req, res, next) {
  let faculty
  console.log(req.params)
  try {
    faculty = await Faculty.findOne({ name: req.params.name })
    if (faculty == null) {
      return res.status(404).json({ message: "Can't find faculty" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.faculty = faculty
  next()
}

module.exports = router
