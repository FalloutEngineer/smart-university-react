const express = require("express")
const router = express.Router()
const Pulpit = require("../../models/pulpit")

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

module.exports = router
