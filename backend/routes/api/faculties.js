const express = require("express")
const router = express.Router()
const Faculty = require("../../models/faculty")

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
router.get("/:id", getFaculty, (req, res) => {
  res.json(res.faculty)
})

async function getFaculty(req, res, next) {
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
