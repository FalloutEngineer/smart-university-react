const express = require("express")
const Building = require("../../models/building")

const router = express.Router()

//get all
router.get("/", async (req, res) => {
  try {
    const buildings = await Building.find()
    res.json(buildings)
  } catch (err) {
    res.status().json({ message: err.message })
  }
})

//get one
router.get("/:name", getBuilding, (req, res) => {
  res.json(res.building)
})

async function getBuilding(req, res, next) {
  try {
    building = await Building.findOne({
      name: req.params.name,
    })
    if (building == null) {
      return res.status(404).json({ message: "Can't find building" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.building = building
  next()
}

module.exports = router
