const Router = require("express")
const router = new Router()

const User = require("../../models/user.js")
const Role = require("../../models/role.js")

const requireAuth = require("../../middleware/requireAuth.js")

router.get("/", requireAuth, async (req, res) => {
  console.log(req.role)
  res.json({
    role: req.role,
  })
})

module.exports = router
