const express = require("express")

const multer = require("multer")
const path = require("path")

const Building = require("../../models/building")
const Floor = require("../../models/floor")

const requireAuth = require("../../middleware/requireAuth.js")

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static/svg")
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
  let building

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

//create one
router.post("/", requireAuth, upload.single("svg"), async (req, res) => {
  if (req.body.floors) {
    req.body.floors = JSON.parse(req.body.floors)
  }

  let floorsArray = []

  let isFloorsExists = true

  if (floorsArray.length > 0 && floorsArray != "[]") {
    for (const floor of req.body.floors) {
      floorsArray.push(null != (await Floor.exists({ number: floor.number })))
    }

    isFloorsExists = floorsArray.every((i) => i === true)
  }

  let svg

  if (req.file) {
    svg = req.file.filename
  }

  if (isFloorsExists) {
    const building = new Building({
      name: req.body.name,
      floors: req.body.floors[0] != "" ? req.body.floors : [],
      svg: svg,
      // background: req.body.background,
      address: req.body.address,
    })

    try {
      const newBuilding = await building.save()

      res.status(201).json({ building: newBuilding })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  } else {
    res.status(400).json({ message: "Invalid floors" })
  }
})

router.delete("/:name", requireAuth, getBuilding, async (req, res) => {
  try {
    if (res.building.svg) {
      const address = path.resolve("./static/svg/" + res.building.svg)
      if (fs.existsSync(address)) {
        fs.unlinkSync(address)
      }
    }

    await res.building.remove()
    res.json({ message: "Deleted Building" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
