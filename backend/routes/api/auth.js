const Router = require("express")
const router = new Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const User = require("../../models/user.js")
const Role = require("../../models/role.js")
const { secret } = require("../../config.js")

let generateAccessToken = (id) => {
  let payload = {
    id,
  }
  let sign = jwt.sign(payload, secret, { expiresIn: "24h" })
  return sign
}

// router.post("/register", async (req, res) => {
//   try {
//     const { login, password } = req.body
//     const candidate = await User.findOne({ login })
//     if (candidate) {
//       return res.status(400).json({ message: "Такий користувач вже існує" })
//     }
//     const hashedPassword = bcrypt.hashSync(password, 7)
//     const user = new User({ login, password: hashedPassword })
//     await user.save()
//     return res.json({ message: `User ${login} was created` })
//   } catch (err) {
//     res.status(400).json({ message: err.message })
//   }
// })

router.post("/login", async (req, res) => {
  try {
    let { login, password } = req.body
    let user = await User.findOne({ login })
    console.log(user)
    if (!user) {
      return res.status(400).json({ message: "Користувача не знайдено" })
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      return res.status(400).json({ message: "Не вірний пароль" })
    }
    let token = generateAccessToken(user._id)
    let role = await Role.findOne({ _id: user.role })
    return res.json({ token, role })
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
})

module.exports = router
