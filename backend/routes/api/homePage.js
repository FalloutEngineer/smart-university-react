const express = require("express")
const router = express.Router()
const HomePage = require("../../models/homePage")

const requireAuth = require("../../middleware/requireAuth.js")

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
router.post("/", requireAuth, async (req, res) => {
  const isHomePageExists = await HomePage.exists({})

  if (!isHomePageExists) {
    const homePage = new HomePage({
      heading: req.body.heading,
      buttonLink: req.body.buttonLink,
      images: req.body.images,
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
router.patch("/", requireAuth, async (req, res) => {
  const isHomePageExists = await HomePage.exists({})

  if (isHomePageExists) {
    const homePages = await HomePage.find()

    if (req.body.heading) {
      homePages[0].heading = req.body.heading
    }
    if (req.body.buttonLink) {
      homePages[0].buttonLink = req.body.buttonLink
    }
    if (req.body.images) {
      homePages[0].images = req.body.images
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
