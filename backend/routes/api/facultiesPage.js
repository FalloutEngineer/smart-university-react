const express = require("express")
const router = express.Router()
const FacultiesPage = require("../../models/facultiesPage")

const requireAuth = require("../../middleware/requireAuth.js")

//get
router.get("/", async (req, res) => {
  try {
    const facultiesPages = await FacultiesPage.find()
    res.json(facultiesPages[0])
  } catch (err) {
    res.status().json({ message: err.message })
  }
})

//create one
router.post("/", requireAuth, async (req, res) => {
  const isFacultiesPagesExists = await FacultiesPage.exists({})

  if (!isFacultiesPagesExists) {
    const facultiesPage = new FacultiesPage({
      heading: req.body.heading,
      description: req.body.description,
      images: req.body.images,
    })

    try {
      const newFacultiesPage = await facultiesPage.save()

      res.status(201).json({
        message: `Successfuly created faculties page!`,
        page: newFacultiesPage,
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
  const isFacultiesPageExists = await FacultiesPage.exists({})

  if (isFacultiesPageExists) {
    const facultiesPages = await FacultiesPage.find()

    if (req.body.heading) {
      facultiesPages[0].heading = req.body.heading
    }
    if (req.body.description) {
      facultiesPages[0].description = req.body.description
    }
    if (req.body.images) {
      facultiesPages[0].images = req.body.images
    }

    try {
      const updatedFacultiesPage = await facultiesPages[0].save()
      res.json(updatedFacultiesPage)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  } else {
    res.status(400).json({ message: "Something went wrong" })
  }
})

module.exports = router
