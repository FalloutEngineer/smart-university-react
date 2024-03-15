const Router = require("express")
const router = new Router()

const requireAuth = require("../../middleware/requireAuth.js")

router.get("/", requireAuth, async (req, res) => {
  if (req.role) {
    res.json({
      role: req.role,
    })
  } else {
    res.status(404).send("Something went wrong with role")
  }
})

module.exports = router
