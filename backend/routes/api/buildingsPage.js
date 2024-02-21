const express = require("express")
const router = express.Router()
const BuildingsPage = require("../../models/buildingsPage")

const requireAuth = require("../../middleware/requireAuth.js")

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
router.patch("/", requireAuth, async (req, res) => {
  const isBuildingsPageExists = await BuildingsPage.exists({})

  if (isBuildingsPageExists) {
    const buildingsPages = await BuildingsPage.find()

    if (req.body.heading) {
      buildingsPages[0].heading = req.body.heading
    }
    if (req.body.description) {
      buildingsPages[0].description = req.body.description
    }
    if (req.body.images) {
      buildingsPages[0].images = req.body.images
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
})

module.exports = router
