const express = require("express")
const router = express.Router()
const Faculty = require("../../models/faculty")

const requireAuth = require("../../middleware/requireAuth.js")
const { isEditor } = require("../../util/permissionsCheckers.js")

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
  if (isEditor(req.role)) {
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
  } else {
    res.status(500).json({ message: "Not enough rights" })
  }
})

// delete one
router.delete("/:name", requireAuth, getFaculty, async (req, res) => {
  if (isEditor(req.role)) {
    try {
      await res.faculty.remove()
      res.json({ message: "Faculty successfull deleted" })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  } else {
    res.status(500).json({ message: "Not enough rights" })
  }
})

async function getFaculty(req, res, next) {
  let faculty
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
