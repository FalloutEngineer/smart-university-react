const express = require("express")

const multer = require("multer")
const path = require("path")

const Building = require("../../models/building")
const Floor = require("../../models/floor")

const requireAuth = require("../../middleware/requireAuth.js")

const router = express.Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "svg") {
      cb(null, "./static/svg/building")
    }
    if (file.fieldname === "background") {
      cb(null, "./static/img/building")
    }
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
router.post(
  "/",
  requireAuth,
  upload.fields([
    {
      name: "svg",
      maxCount: 1,
    },
    {
      name: "background",
      maxCount: 1,
    },
  ]),
  async (req, res) => {
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
    let background

    if (req.files) {
      console.log(req.files)
      if (req.files["svg"]) {
        svg = req.files["svg"][0].filename
      }
      if (req.files["background"]) {
        background = req.files["background"][0].filename
      }
    }

    if (isFloorsExists) {
      console.log(background)
      const building = new Building({
        name: req.body.name,
        floors: req.body.floors[0] != "" ? req.body.floors : [],
        svg: svg,
        background: background,
        address: req.body.address,
        description: req.body.description,
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
  }
)

router.delete("/:name", requireAuth, getBuilding, async (req, res) => {
  try {
    if (res.building.svg) {
      const address = path.resolve("./static/img/building/" + res.building.svg)
      if (fs.existsSync(address)) {
        fs.unlinkSync(address)
      }
    }

    if (res.building.background) {
      const address = path.resolve(
        "./static/img/building/" + res.building.background
      )
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
