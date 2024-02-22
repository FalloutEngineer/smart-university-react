const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const fs = require("fs")

const HomePage = require("../../models/homePage")

const requireAuth = require("../../middleware/requireAuth.js")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static/images/home")
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  },
})

const upload = multer({
  storage: storage,
})

//get
router.get("/", async (req, res) => {
  try {
    const homePages = await HomePage.find()
    res.json(homePages[0])
  } catch (err) {
    res.status().json({ message: err.message })
  }
})

//create one
router.post("/", requireAuth, upload.any("images"), async (req, res) => {
  const isHomePageExists = await HomePage.exists({})

  if (!isHomePageExists) {
    const homePage = new HomePage({
      heading: req.body.heading,
      buttonLink: req.body.buttonLink,
      images: images[0] != "" ? images : [],
    })

    try {
      const newHomePage = await homePage.save()

      res
        .status(201)
        .json({ message: `Successfuly created home page!`, page: newHomePage })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  } else {
    res.status(400).json({ message: "Something went wrong" })
  }
})

//update one
router.patch("/", requireAuth, upload.any("images"), async (req, res) => {
  const isHomePageExists = await HomePage.exists({})

  if (isHomePageExists) {
    const homePages = await HomePage.find()

    if (req.body.heading) {
      homePages[0].heading = req.body.heading
    }
    if (req.body.buttonLink) {
      homePages[0].buttonLink = req.body.buttonLink
    }

    const images = req.files.map((file) => file.filename)

    res.room.images.forEach((link) => {
      const address = path.resolve("./static/images/" + link)
      if (fs.existsSync(address)) {
        fs.unlinkSync(address)
      }
    })

    if (req.body.images != null) {
      res.room.images = images
    }

    try {
      const updatedHomePage = await homePages[0].save()
      res.json(updatedHomePage)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  } else {
    res.status(400).json({ message: "Something went wrong" })
  }
})

module.exports = router
