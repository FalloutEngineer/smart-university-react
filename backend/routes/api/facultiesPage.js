const express = require("express")
const router = express.Router()
const multer = require("multer")
const path = require("path")
const fs = require("fs")

const FacultiesPage = require("../../models/facultiesPage")

const requireAuth = require("../../middleware/requireAuth.js")
const { isEditor } = require("../../util/permissionsCheckers.js")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static/images/faculties")
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
    const facultiesPages = await FacultiesPage.find()
    res.json(facultiesPages[0])
  } catch (err) {
    res.status().json({ message: err.message })
  }
})

//create one
router.post("/", requireAuth, async (req, res) => {
  if (isEditor(req.role)) {
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
  } else {
    res.status(500).json({ message: "Not enough rights" })
  }
})

//update one
router.patch(
  "/",
  requireAuth,
  upload.any("images"),
  getFaculties,
  async (req, res) => {
    if (isEditor(req.role)) {
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

        const images = req.files.map(
          (file) => "/images/faculties/" + file.filename
        )

        facultiesPages[0].images.forEach((link) => {
          const address = path.resolve("./static/images/faculties/" + link)
          if (fs.existsSync(address)) {
            fs.unlinkSync(address)
          }
        })

        if (images != null) {
          facultiesPages[0].images = images
        }

        try {
          const updatedFacultiesPage = await facultiesPages[0].save()
          res.json(updatedFacultiesPage)
        } catch (err) {
          res.status(400).json({ message: err.message })
        }
      } else {
        const isFacultiesPagesExists = await FacultiesPage.exists({})

        if (!isFacultiesPagesExists) {
          const facultiesPage = new FacultiesPage({
            heading:
              req.body.heading && req.body.heading !== ""
                ? req.body.heading
                : "Факультети",
            description:
              req.body.description && req.body.description !== ""
                ? req.body.description
                : "Опис",
            images:
              req.body.images && req.body.images.length !== 0
                ? req.body.images
                : [],
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
      }
    } else {
      res.status(500).json({ message: "Not enough rights" })
    }
  }
)

async function getFaculties(req, res, next) {
  let page
  try {
    page = await FacultiesPage.findOne({})
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
