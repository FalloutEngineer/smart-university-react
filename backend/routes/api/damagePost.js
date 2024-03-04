const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const fs = require("fs")

const DamagePost = require("../../models/damagePost.js")

const Building = require("../../models/building.js")

const requireAuth = require("../../middleware/requireAuth.js")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static/images/damage")
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
    const damage = await DamagePost.find()
    res.json(damage)
  } catch (err) {
    res.status().json({ message: err.message })
  }
})

//get one
router.get("/:name", getDamage, (req, res) => {
  res.json(res.damage)
})

async function getDamage(req, res, next) {
  let damage
  try {
    damage = await DamagePost.findOne({
      name: req.params.name,
    })
    if (damage == null) {
      return res.status(404).json({ message: "Can't find damage post" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.damage = damage
  next()
}

//create one
router.post("/", requireAuth, upload.any("images"), async (req, res) => {
  let isBuildingExists = await Building.exists({ name: req.body.building })

  if (req.body.sum) {
    req.body.sum = Number(req.body.sum)
  }

  let images = []

  if (req.files) {
    images = req.files.map((file) => file.filename)
  }

  if (isBuildingExists) {
    const damage = new DamagePost({
      name: req.body.name,
      photo_links: images[0] != "" ? images : [],
      description: req.body.description,
      status: req.body.status,
      building: req.body.building,
      location: req.body.location,
      sum: req.body.sum,
    })

    try {
      const newDamage = await damage.save()

      res.status(201).json(newDamage)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  } else {
    res.status(400).json({ message: "Invalid building" })
  }
})

// delete one
router.delete("/:name", requireAuth, getDamage, async (req, res) => {
  try {
    res.damage.photo_links.forEach((link) => {
      const address = path.resolve("./static/images/damage" + link)
      if (fs.existsSync(address)) {
        fs.unlinkSync(address)
      }
    })

    await res.damage.remove()
    res.json({ message: "Deleted Damage post" })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// //update one
router.patch(
  "/:name",
  requireAuth,
  upload.any("images"),
  getDamage,
  async (req, res) => {
    let isBuildingExists = await Building.exists({ name: req.body.building })

    if (req.body.building != [] && req.body.faculty) {
      isBuildingExists = await Building.exists({ name: req.body.building })

      if (req.body.sum) {
        req.body.sum = Number(req.body.sum)
      }
    }

    let images = []

    if (req.files) {
      images = req.files.map((file) => file.filename)
    }

    res.damage.photo_links.forEach((link) => {
      const address = path.resolve("./static/images/damage/" + link)
      if (fs.existsSync(address)) {
        fs.unlinkSync(address)
      }
    })
    if (isBuildingExists) {
      if (req.body.name != null) {
        res.damage.name = req.body.name
      }
      if (req.body.photo_links != null) {
        res.damage.photo_links = images
      }
      if (req.body.status != null) {
        res.damage.status = req.body.status
      }
      if (req.body.building != null) {
        res.damage.building = req.body.building
      }
      if (req.body.location != null) {
        res.damage.location = req.body.location
      }
      if (req.body.description != null) {
        res.damage.description = req.body.description
      }
      if (req.body.sum != null) {
        res.damage.sum = req.body.sum
      }

      try {
        const updatedBuilding = await res.damage.save()
        res.json(updatedBuilding)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
    } else {
      res.status(400).json({ message: "Invalid building" })
    }
  }
)

module.exports = router
