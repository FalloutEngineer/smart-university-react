const express = require("express")
const router = express.Router()
const BuildingsPage = require("../../models/buildingsPage")
const multer = require("multer")
const path = require("path")
const fs = require("fs")

const requireAuth = require("../../middleware/requireAuth.js")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static/images/buildings")
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
    const buildingsPages = await BuildingsPage.find()
    res.json(buildingsPages[0])
  } catch (err) {
    res.status().json({ message: err.message })
  }
})

//create one
router.post("/", requireAuth, async (req, res) => {
  const isBuildingsPageExists = await BuildingsPage.exists({})

  if (!isBuildingsPageExists) {
    const buildingsPage = new BuildingsPage({
      heading: req.body.heading,
      description: req.body.description,
      images: req.body.images,
    })

    try {
      const newBuildingsPage = await buildingsPage.save()

      res.status(201).json({
        message: `Successfuly created faculties page!`,
        page: newBuildingsPage,
      })
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
  getBuildings,
  async (req, res) => {
    const isBuildingsPageExists = await BuildingsPage.exists({})

    if (isBuildingsPageExists) {
      const buildingsPages = await BuildingsPage.find()

      if (req.body.heading) {
        buildingsPages[0].heading = req.body.heading
      }
      if (req.body.description) {
        buildingsPages[0].description = req.body.description
      }

      const images = req.files.map(
        (file) => "/images/buildings/" + file.filename
      )

      buildingsPages[0].images.forEach((link) => {
        const address = path.resolve("./static/images/buildings/" + link)
        if (fs.existsSync(address)) {
          fs.unlinkSync(address)
        }
      })

      if (images != null) {
        buildingsPages[0].images = images
      }

      try {
        const updatedBuildingsPage = await buildingsPages[0].save()
        res.json(updatedBuildingsPage)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
    } else {
      res.status(400).json({ message: "Something went wrong" })
    }
  }
)

async function getBuildings(req, res, next) {
  let page
  try {
    page = await BuildingsPage.findOne({})
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
