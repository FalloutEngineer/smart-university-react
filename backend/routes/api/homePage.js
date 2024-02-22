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
router.patch(
  "/",
  requireAuth,
  upload.any("images"),
  getHome,
  async (req, res) => {
    const isHomePageExists = await HomePage.exists({})

    if (isHomePageExists) {
      const homePages = await HomePage.find()

      if (req.body.heading) {
        homePages[0].heading = req.body.heading
      }
      if (req.body.buttonLink) {
        homePages[0].buttonLink = req.body.buttonLink
      }

      const images = req.files.map((file) => "/images/home/" + file.filename)

      homePages[0].images.forEach((link) => {
        const address = path.resolve("./static/images/home/" + link)
        if (fs.existsSync(address)) {
          fs.unlinkSync(address)
        }
      })

      if (images != null) {
        homePages[0].images = images
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
  }
)

async function getHome(req, res, next) {
  let page
  try {
    page = await HomePage.findOne({})
    console.log(page)
    if (page === null) {
      return res.status(404).json({ message: "Can't find page" })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }

  res.page = page
  next()
}

module.exports = router
