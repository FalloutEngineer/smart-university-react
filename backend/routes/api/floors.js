const express = require("express")
const router = express.Router()
const Floor = require("../../models/floor")

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
