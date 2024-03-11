const Router = require("express")
const router = new Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../../models/user.js")
const { secret } = require("../../config.js")

const generateAccessToken = (id) => {
  const payload = {
    id,
  }
  return jwt.sign(payload, secret, { expiresIn: "24h" })
}

router.post("/register", async (req, res) => {
  try {
    const { login, password } = req.body
    const candidate = await User.findOne({ login })
    if (candidate) {
      return res.status(400).json({ message: "Такий користувач вже існує" })
    }
    const hashedPassword = bcrypt.hashSync(password, 7)
    const user = new User({ login, password: hashedPassword })
    await user.save()
    return res.json({ message: `User ${login} was created` })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
