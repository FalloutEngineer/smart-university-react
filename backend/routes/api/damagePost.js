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

// // delete one
// router.delete("/:number", requireAuth, getRoom, async (req, res) => {
//   try {
//     await Floor.updateOne(
//       { rooms: res.room.number },
//       {
//         $pullAll: {
//           rooms: [res.room.number],
//         },
//       }
//     )
//     await Pulpit.updateMany(
//       { rooms: res.room.number },
//       {
//         $pullAll: {
//           rooms: [res.room.number],
//         },
//       }
//     )

//     res.room.photo_links.forEach((link) => {
//       const address = path.resolve("./static/images/" + link)
//       if (fs.existsSync(address)) {
//         fs.unlinkSync(address)
//       }
//     })

//     await res.room.remove()
//     res.json({ message: "Deleted Room" })
//   } catch (err) {
//     res.status(500).json({ message: err.message })
//   }
// })

// //update one
// router.patch(
//   "/:number",
//   requireAuth,
//   upload.any("images"),
//   getRoom,
//   async (req, res) => {
//     let isFacultyExists = true
//     let isFloorExists = true

//     if (req.body.floor) req.body.floor = Number(req.body.floor)
//     if (req.body.pulpits) req.body.pulpits = JSON.parse(req.body.pulpits[0])

//     if (req.body.floor != [] && req.body.floor) {
//       isFloorExists = await Floor.exists({ number: req.body.floor })
//     }
//     if (req.body.faculty != [] && req.body.faculty) {
//       isFacultyExists = await Faculty.exists({ name: req.body.faculty })
//     }

//     let pulpitsArray = []

//     let isPulpitssExists = true

//     const images = req.files.map((file) => file.filename)

//     res.room.photo_links.forEach((link) => {
//       const address = path.resolve("./static/images/" + link)
//       if (fs.existsSync(address)) {
//         fs.unlinkSync(address)
//       }
//     })

//     if (req.body.pulpits) {
//       for (const pulpit of req.body.pulpits) {
//         pulpitsArray.push(null != (await Pulpit.exists({ name: pulpit })))
//       }
//       isPulpitssExists = pulpitsArray.every((i) => i === true)
//     }

//     if (isFacultyExists && isFloorExists && isPulpitssExists) {
//       if (req.body.number != null) {
//         res.room.number = req.body.number
//       }
//       if (req.body.floor != null) {
//         res.room.floor = req.body.floor
//       }
//       if (req.body.faculty != null) {
//         res.room.faculty = req.body.faculty
//       }
//       if (req.body.capacity != null) {
//         res.room.capacity = req.body.capacity
//       }
//       if (req.body.type != null) {
//         res.room.type = req.body.type
//       }
//       if (req.body.photo_links != null) {
//         res.room.photo_links = images
//       }
//       if (req.body.description != null) {
//         res.room.description = req.body.description
//       }
//       if (req.body.assistant != null) {
//         res.room.assistant = req.body.assistant
//       }
//       if (req.body.model != null) {
//         res.room.model = req.body.model
//       }
//       if (req.body.pulpits != null) {
//         res.room.pulpits = req.body.pulpits
//       }
//       if (req.body.co2 != null) {
//         res.room.co2 = req.body.co2
//       }
//       if (req.body.temperature != null) {
//         res.room.temperature = req.body.temperature
//       }
//       if (req.body.co2_history != null) {
//         res.room.co2_history = req.body.co2_history
//       }
//       if (req.body.temperature_history != null) {
//         res.room.temperature_history = req.body.temperature_history
//       }
//       try {
//         const updatedRoom = await res.room.save()
//         res.json(updatedRoom)
//       } catch (err) {
//         res.status(400).json({ message: err.message })
//       }
//     } else {
//       res.status(400).json({ message: "Invalid floor, faculty or pulpit" })
//     }
//   }
// )

module.exports = router
